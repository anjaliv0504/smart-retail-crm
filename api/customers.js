import { initialCustomers } from "../src/data/customers.js";

const STORE_KEY = "retail-marketing-tool:customers";
const seedIds = new Set(initialCustomers.map((customer) => customer.id));

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return [value];
}

function primaryChoice(value, fallback = "") {
  return asArray(value)[0] || fallback;
}

function estimatedValueFor(category, brandTier) {
  const selectedCategory = primaryChoice(category, "Mobile/Smartwatch");
  const selectedTier = primaryChoice(brandTier, "Mainstream");
  const values = {
    "Mobile/Smartwatch": { Budget: 18000, Mainstream: 30000, Premium: 45000, Undecided: 28000 },
    "Laptop/IT": { Budget: 32000, Mainstream: 55000, Premium: 85000, Undecided: 52000 },
    "TV/Audio": { Budget: 22000, Mainstream: 48000, Premium: 85000, Undecided: 45000 },
    "Home Appliances": { Budget: 18000, Mainstream: 42000, Premium: 90000, Undecided: 38000 }
  };
  return values[selectedCategory]?.[selectedTier] || values["Mobile/Smartwatch"].Mainstream;
}

function withCurrentEstimate(customer) {
  return {
    ...customer,
    estimatedValue: estimatedValueFor(customer.category, customer.brandTier)
  };
}

function normalizeCustomers(customers) {
  const realEntries = customers.filter((customer) => !seedIds.has(customer.id) && customer.id < 1000).map(withCurrentEstimate);
  const userEntries = customers.filter((customer) => customer.id > 1000000000000).map(withCurrentEstimate);
  const currentSeedRows = initialCustomers.map((customer) => {
    const existing = customers.find((item) => item.id === customer.id);
    return existing ? { ...existing, ...customer } : customer;
  });

  return [...userEntries, ...realEntries, ...currentSeedRows]
    .filter((customer, index, list) => list.findIndex((item) => item.id === customer.id) === index);
}

async function kvRequest(command, args = []) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    throw new Error("Vercel KV is not connected");
  }

  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify([[command, STORE_KEY, ...args]])
  });

  if (!response.ok) {
    throw new Error(`KV request failed: ${response.status}`);
  }

  const [result] = await response.json();
  if (result.error) throw new Error(result.error);
  return result.result;
}

async function getCustomers() {
  const raw = await kvRequest("get");
  if (!raw) {
    await kvRequest("set", [JSON.stringify(initialCustomers)]);
    return initialCustomers;
  }

  const customers = JSON.parse(raw);
  const normalized = normalizeCustomers(customers);
  if (JSON.stringify(normalized) !== JSON.stringify(customers)) {
    await saveCustomers(normalized);
  }

  return normalized;
}

async function saveCustomers(customers) {
  await kvRequest("set", [JSON.stringify(customers)]);
}

export default async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  try {
    if (request.method === "GET") {
      const customers = await getCustomers();
      response.status(200).json({ customers, storage: "vercel-kv" });
      return;
    }

    if (request.method === "POST") {
      const body = request.body || {};
      const customers = await getCustomers();
      const nextCustomers = [body.customer, ...customers].filter(Boolean);
      await saveCustomers(nextCustomers);
      response.status(201).json({ customers: nextCustomers, storage: "vercel-kv" });
      return;
    }

    response.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    if (request.method === "GET") {
      response.status(200).json({
        customers: initialCustomers,
        storage: "demo-seed",
        warning: error.message
      });
      return;
    }

    response.status(503).json({
      error: "Shared database is not connected yet",
      detail: error.message
    });
  }
}
