import { initialCustomers } from "../src/data/customers.js";

const STORE_KEY = "retail-marketing-tool:customers";
const VERSION_KEY = "retail-marketing-tool:dataset-version";
const DATASET_VERSION = "pdf-monday-thursday-58-form-redesign-v5";
const seedIds = new Set(initialCustomers.map((customer) => customer.id));

async function kvKeyRequest(command, key, args = []) {
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
    body: JSON.stringify([[command, key, ...args]])
  });

  if (!response.ok) {
    throw new Error(`KV request failed: ${response.status}`);
  }

  const [result] = await response.json();
  if (result.error) throw new Error(result.error);
  return result.result;
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return [value];
}

function primaryChoice(value, fallback = "") {
  return asArray(value)[0] || fallback;
}

function numericPrice(value) {
  const parsed = Number(String(value || "").replace(/[^0-9]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function estimatedValueFor(category, brandTier, priceMismatchRange = "") {
  const direct = numericPrice(priceMismatchRange);
  if (direct) return direct;

  const selectedCategory = primaryChoice(category, "Mobile");
  const selectedTier = primaryChoice(brandTier, "Mainstream");
  const values = {
    Mobile: { Budget: 18000, Mainstream: 30000, Premium: 45000, Undecided: 28000 },
    Wearables: { Budget: 5000, Mainstream: 12000, Premium: 30000, Undecided: 10000 },
    "Laptop/IT": { Budget: 32000, Mainstream: 55000, Premium: 85000, Undecided: 52000 },
    "Home Appliances": { Budget: 18000, Mainstream: 42000, Premium: 90000, Undecided: 38000 },
    Gaming: { Budget: 45000, Mainstream: 85000, Premium: 140000, Undecided: 75000 },
    "New Age Gadgets": { Budget: 8000, Mainstream: 25000, Premium: 60000, Undecided: 22000 }
  };
  return values[selectedCategory]?.[selectedTier] || values.Mobile.Mainstream;
}

function withCurrentEstimate(customer) {
  const category = asArray(customer.category).map((item) => {
    if (item === "Mobile/Smartwatch") return "Mobile";
    if (item === "Smartwatch/Wearables") return "Wearables";
    if (item === "TV/Audio") return "Home Appliances";
    return item;
  });
  const techKnowledge = asArray(customer.techKnowledge).map((item) => item === "Aggressive Negotiator" ? "Early Adopter" : item);
  const financialHook = asArray(customer.financialHook).map((item) => item === "Upfront Cash" ? "Extended Warranty" : item);
  const competitor = asArray(customer.competitor).map((item) => item === "Apple Store" ? "Brand Store - Apple" : item);
  const walkoutReason = asArray(customer.walkoutReason).map((reason, index) => {
    if (reason === "Finance/Card Issue") return index % 2 ? "Card Issue" : "Finance Issue";
    if (reason === "Color/Model Out of Stock" || reason === "Stock Issue") return index % 2 ? "Color Not Available" : "Model Not Available";
    if (reason === "Price Sensitive") return "Online Price Mismatch";
    return reason;
  });

  return {
    ...customer,
    category,
    techKnowledge,
    financialHook,
    competitor,
    walkoutReason,
    estimatedValue: estimatedValueFor(category, customer.brandTier, customer.priceMismatchRange || customer.directPrice)
  };
}

function normalizeCustomers(customers) {
  const realEntries = customers.filter((customer) => !seedIds.has(customer.id) && customer.id < 1000).map(withCurrentEstimate);
  const userEntries = customers.filter((customer) => customer.id > 1000000000000).map(withCurrentEstimate);
  const currentSeedRows = initialCustomers.map((customer) => {
    const existing = customers.find((item) => item.id === customer.id);
    return existing ? withCurrentEstimate({ ...existing, ...customer }) : customer;
  });

  return [...userEntries, ...realEntries, ...currentSeedRows]
    .filter((customer, index, list) => list.findIndex((item) => item.id === customer.id) === index);
}

async function kvRequest(command, args = []) {
  return kvKeyRequest(command, STORE_KEY, args);
}

async function getCustomers() {
  const version = await kvKeyRequest("get", VERSION_KEY);
  if (version !== DATASET_VERSION) {
    const raw = await kvRequest("get");
    const existingCustomers = raw ? JSON.parse(raw) : initialCustomers;
    const normalized = normalizeCustomers(existingCustomers);
    await saveCustomers(normalized);
    await kvKeyRequest("set", VERSION_KEY, [DATASET_VERSION]);
    return normalized;
  }

  const raw = await kvRequest("get");
  if (!raw) {
    await kvRequest("set", [JSON.stringify(initialCustomers)]);
    await kvKeyRequest("set", VERSION_KEY, [DATASET_VERSION]);
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
