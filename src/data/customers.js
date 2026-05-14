const baseCustomers = [
  ["Aarav Mehta", "9876543210", "Mobile/Smartwatch", "Deal-Hunter", "Tech-Savvy", "Sole Decision", "Premium", "Online Price Mismatch", "Amazon/Flipkart", "2% to 5%", "Credit Card Discount", "Today/Immediate", "Urgent Deal-Hunter", 84000],
  ["Priya Nair", "9988776655", "Home Appliances", "Family", "Needs Guidance", "Needs Approval", "Mainstream", "Finance/Card Issue", "Croma/Vijay Sales", "Not a price issue", "No-Cost EMI", "This Week", "Family Planner", 52000],
  ["Kabir Singh", "9123456789", "TV/Audio", "Corporate", "Status-Driven", "Corporate Approval", "Premium", "Color/Model Out of Stock", "Local Dealer", "Under 2%", "Exchange Bonus", "Next Week/Month", "Corporate Premium", 118000]
];

const names = [
  "Riya Sharma", "Vivaan Rao", "Meera Iyer", "Arjun Kapoor", "Sana Khan", "Dev Patel", "Nisha Gupta", "Karan Malhotra",
  "Anaya Das", "Rohan Verma", "Ishita Sen", "Yash Bansal", "Tara Joshi", "Aditya Menon", "Kiara Shah", "Nikhil Jain",
  "Pooja Sinha", "Harsh Agarwal", "Simran Kaur", "Rahul Chawla", "Neha Reddy", "Manav Bhatia", "Aisha Mirza", "Varun Saxena",
  "Dia Chatterjee", "Om Prakash", "Tanvi Arora", "Sahil Grover", "Lavanya Pillai", "Akash Suri", "Maya Thomas", "Rudra Vyas",
  "Anika Bose", "Jay Mehta", "Shreya Kulkarni", "Ibrahim Sheikh", "Mitali Roy", "Parth Nanda", "Avni Desai", "Rehan Ali",
  "Sanya Gill", "Raghav Mathur"
];

const categories = ["Mobile/Smartwatch", "Laptop/IT", "TV/Audio", "Home Appliances"];
const buyingDrivers = ["Corporate", "Family", "Individual", "Deal-Hunter"];
const techKnowledge = ["Tech-Savvy", "Needs Guidance", "Status-Driven", "Aggressive Negotiator"];
const decisionMakers = ["Sole Decision", "Influencer Present", "Needs Approval", "Corporate Approval"];
const brandTiers = ["Premium", "Mainstream", "Budget", "Undecided"];
const walkoutReasons = ["Online Price Mismatch", "Color/Model Out of Stock", "Finance/Card Issue", "Just Browsing"];
const competitors = ["Amazon/Flipkart", "Croma/Vijay Sales", "Local Dealer", "No comparison"];
const priceGaps = ["Under 2%", "2% to 5%", "Above 5%", "Not a price issue"];
const financialHooks = ["Exchange Bonus", "No-Cost EMI", "Credit Card Discount", "Upfront Cash"];
const urgencies = ["Today/Immediate", "This Week", "Next Week/Month", "Window Shopping"];

function pick(list, index, offset = 0) {
  return list[(index + offset) % list.length];
}

function valueFor(category, tier) {
  const base = {
    "Mobile/Smartwatch": 55000,
    "Laptop/IT": 78000,
    "TV/Audio": 90000,
    "Home Appliances": 62000
  }[category];
  const multiplier = { Premium: 1.35, Mainstream: 1, Budget: 0.72, Undecided: 0.9 }[tier];
  return Math.round(base * multiplier);
}

function personaFor(urgency, driver, tier, reason) {
  if (urgency === "Today/Immediate") return `Urgent ${driver}`;
  if (driver === "Corporate") return "Corporate Buyer";
  if (tier === "Premium") return "Premium Seeker";
  if (reason === "Online Price Mismatch") return "Price Watcher";
  return `${tier} ${driver}`;
}

const generatedCustomers = names.map((name, index) => {
  const category = pick(categories, index);
  const buyingDriver = pick(buyingDrivers, index, 1);
  const brandTier = pick(brandTiers, index, 2);
  const walkoutReason = pick(walkoutReasons, index, 3);
  const urgency = pick(urgencies, index, 1);

  return {
    id: 1000 + index,
    name,
    phone: `9${String(600000000 + index * 73129).slice(0, 9)}`,
    category,
    buyingDriver,
    techKnowledge: pick(techKnowledge, index, 2),
    decisionMaker: pick(decisionMakers, index, 1),
    brandTier,
    walkoutReason,
    competitor: pick(competitors, index, 2),
    priceGap: pick(priceGaps, index),
    financialHook: pick(financialHooks, index, 3),
    urgency,
    personaTag: personaFor(urgency, buyingDriver, brandTier, walkoutReason),
    createdAt: `Today, ${String(10 + (index % 9)).padStart(2, "0")}:${String((index * 7) % 60).padStart(2, "0")} ${index % 2 ? "PM" : "AM"}`,
    estimatedValue: valueFor(category, brandTier)
  };
});

export const initialCustomers = [
  ...baseCustomers.map((customer, index) => ({
    id: index + 1,
    name: customer[0],
    phone: customer[1],
    category: customer[2],
    buyingDriver: customer[3],
    techKnowledge: customer[4],
    decisionMaker: customer[5],
    brandTier: customer[6],
    walkoutReason: customer[7],
    competitor: customer[8],
    priceGap: customer[9],
    financialHook: customer[10],
    urgency: customer[11],
    personaTag: customer[12],
    createdAt: "Today, 11:15 AM",
    estimatedValue: customer[13]
  })),
  ...generatedCustomers
];
