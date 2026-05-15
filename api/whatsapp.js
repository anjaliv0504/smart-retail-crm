function cleanPhone(phone = "") {
  return String(phone).replace(/\D/g, "").slice(-10);
}

function toIndiaMsisdn(phone = "") {
  const cleaned = cleanPhone(phone);
  return cleaned.length === 10 ? `91${cleaned}` : "";
}

function requiredConfig() {
  return {
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    apiVersion: process.env.WHATSAPP_API_VERSION || "v20.0"
  };
}

async function sendTextMessage({ to, message }) {
  const { accessToken, phoneNumberId, apiVersion } = requiredConfig();

  if (!accessToken || !phoneNumberId) {
    const missing = [
      !accessToken && "WHATSAPP_ACCESS_TOKEN",
      !phoneNumberId && "WHATSAPP_PHONE_NUMBER_ID"
    ].filter(Boolean);
    return {
      ok: false,
      status: 400,
      body: {
        error: "WhatsApp API is not configured",
        detail: `Add ${missing.join(" and ")} in Vercel environment variables.`
      }
    };
  }

  const response = await fetch(`https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "text",
      text: {
        preview_url: false,
        body: message
      }
    })
  });

  const body = await response.json();
  return { ok: response.ok, status: response.status, body };
}

export default async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const payload = typeof request.body === "string" ? JSON.parse(request.body) : request.body || {};
    const { phone, message, customerName } = payload;
    const to = toIndiaMsisdn(phone);
    const text = String(message || "").trim();

    if (!to) {
      response.status(400).json({ error: "Valid 10-digit Indian WhatsApp number is required" });
      return;
    }

    if (!text) {
      response.status(400).json({ error: "Message text is required" });
      return;
    }

    const result = await sendTextMessage({ to, message: text });
    if (!result.ok) {
      response.status(result.status).json({
        error: result.body.error?.message || result.body.error || "WhatsApp send failed",
        detail: result.body.error?.error_data?.details || result.body.detail || result.body
      });
      return;
    }

    response.status(200).json({
      ok: true,
      to,
      customerName: customerName || "",
      messageId: result.body.messages?.[0]?.id || ""
    });
  } catch (error) {
    response.status(500).json({ error: "WhatsApp send failed", detail: error.message });
  }
}
