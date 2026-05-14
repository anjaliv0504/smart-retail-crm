import { initialCustomers } from "../src/data/customers.js";

const STORE_KEY = "retail-marketing-tool:customers";

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

  return JSON.parse(raw);
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
