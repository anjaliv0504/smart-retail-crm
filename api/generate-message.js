function asArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return [value];
}

function displayValue(value, fallback = "the product") {
  const values = asArray(value).filter(Boolean);
  return values.length ? values.join(", ") : fallback;
}

function fallbackDraft(customer, campaign) {
  const category = displayValue(customer.category);
  const hook = displayValue(customer.financialHook, "the best current offer");
  const reason = displayValue(customer.walkoutReason, "your store visit");
  const variants = [
    `Hi ${customer.name}, Reliance Digital here. ${campaign.details} is available for ${category}. Since your concern was ${reason}, we can check ${hook} and share the exact store quote. Reply YES for details.`,
    `Hello ${customer.name}, quick update from Reliance Digital. For your ${category} requirement, ${campaign.details}. We can also help with ${hook}. Reply INTERESTED and our team will confirm availability.`,
    `Hi ${customer.name}, based on your Reliance Digital visit, we have a relevant update: ${campaign.details}. This should help with ${reason}. Reply YES to get the final price and next step.`
  ];
  const index = Math.abs(Number(customer.id || 0)) % variants.length;
  return variants[index];
}

function extractOutputText(data) {
  if (data.output_text) return data.output_text.trim();
  const text = data.output
    ?.flatMap((item) => item.content || [])
    ?.filter((content) => content.type === "output_text" && content.text)
    ?.map((content) => content.text)
    ?.join(" ");
  return text ? text.trim() : "";
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
    const { customer = {}, campaign = {}, currentDraft = "" } = payload;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      response.status(200).json({
        message: fallbackDraft(customer, campaign),
        source: "fallback",
        warning: "OPENAI_API_KEY is not configured"
      });
      return;
    }

    const input = [
      {
        role: "system",
        content: "You write concise WhatsApp retargeting messages for Reliance Digital store leads in India. Keep messages under 75 words, specific, polite, sales-useful, and compliant. Do not invent discounts beyond the campaign detail. End with a simple reply CTA."
      },
      {
        role: "user",
        content: JSON.stringify({
          task: "Regenerate a better personalized WhatsApp draft. Make it noticeably different from the current draft.",
          customer: {
            name: customer.name,
            category: displayValue(customer.category),
            buyingDriver: displayValue(customer.buyingDriver),
            techKnowledge: displayValue(customer.techKnowledge),
            brandTier: displayValue(customer.brandTier),
            desiredBrand: displayValue(customer.desiredBrand),
            walkoutReason: displayValue(customer.walkoutReason),
            competitor: displayValue(customer.competitor),
            financialHook: displayValue(customer.financialHook),
            requirement: customer.requirement || ""
          },
          campaign,
          currentDraft
        })
      }
    ];

    const aiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        input,
        temperature: 0.85,
        max_output_tokens: 180
      })
    });

    const data = await aiResponse.json();
    if (!aiResponse.ok) {
      response.status(200).json({
        message: fallbackDraft(customer, campaign),
        source: "fallback",
        warning: data.error?.message || "OpenAI generation failed"
      });
      return;
    }

    const message = extractOutputText(data) || fallbackDraft(customer, campaign);
    response.status(200).json({ message, source: "openai" });
  } catch (error) {
    response.status(500).json({ error: "Draft generation failed", detail: error.message });
  }
}
