import React, { useEffect, useMemo, useState } from "react";
import {
  BadgeIndianRupee,
  BarChart3,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  IndianRupee,
  Megaphone,
  MessageCircle,
  Phone,
  PlusCircle,
  Search,
  Send,
  ShoppingBag,
  Store,
  TrendingUp,
  UserRound,
  UsersRound,
  X
} from "lucide-react";
import { initialCustomers } from "./data/customers.js";

const categories = ["Mobile", "Wearables", "Laptop/IT", "Home Appliances", "Gaming", "New Age Gadgets"];
const buyingDrivers = ["Corporate", "Family", "Individual", "Deal-Hunter", "Student", "Gift Purchase"];
const techKnowledge = ["Tech-Savvy", "Needs Guidance", "Status-Driven", "Early Adopter", "Explorer", "Impulse Buyer"];
const decisionMakers = ["Sole Decision", "Influencer Present", "Needs Approval", "Corporate Approval"];
const brandTiers = ["Premium", "Mainstream", "Budget", "Undecided"];
const walkoutReasons = ["Online Price Mismatch", "Color Not Available", "Model Not Available", "Finance Issue", "Card Issue", "Brand Preference", "Budget Constraint", "Exchange Concern", "Service Concern", "Just Browsing"];
const competitors = ["Brand Store", "Brand Store - Samsung", "Brand Store - Apple", "Brand Store - LG", "Brand Store - Sony", "Brand Store - HP", "Brand Store - Lenovo", "Amazon/Flipkart", "Croma/Vijay Sales", "Local Dealer", "No comparison"];
const priceGaps = ["Under 2%", "2% to 5%", "Above 5%", "Not a price issue"];
const financialHooks = ["Exchange Bonus", "No-Cost EMI", "Credit Card Discount", "Extended Warranty"];
const storeSources = ["Walk-in", "Google Search", "Mall/Store Signage", "Friend/Family Referral", "Social Media", "Hoardings"];
const desiredBrands = ["Samsung", "Apple", "LG", "Sony", "HP", "Lenovo", "Dell", "Asus", "Acer", "Whirlpool", "Bosch", "IFB", "Vivo", "Oppo", "OnePlus", "Undecided"];
const triggerTypes = [
  "New Card Discount",
  "Stock Replenished",
  "Price Drop",
  "General Festival Offer",
  "Exchange Upgrade",
  "EMI Rescue",
  "Competitor Winback",
  "Premium Upgrade",
  "Guidance Callback"
];
const anyOption = "Any";

const locationSuggestions = [
  ["sector 29 gurugram", "Sector 29, Gurugram 122001"],
  ["sector 4 gurugram", "Sector 4, Gurugram 122001"],
  ["sector 5 gurugram", "Sector 5, Gurugram 122001"],
  ["sector 7 gurugram", "Sector 7, Gurugram 122001"],
  ["sector 9 gurugram", "Sector 9, Gurugram 122001"],
  ["sector 10 gurugram", "Sector 10, Gurugram 122001"],
  ["sector 14 gurugram", "Sector 14, Gurugram 122001"],
  ["sector 15 gurugram", "Sector 15, Gurugram 122001"],
  ["sector 21 gurugram", "Sector 21, Gurugram 122016"],
  ["sector 22 gurugram", "Sector 22, Gurugram 122015"],
  ["sector 23 gurugram", "Sector 23, Gurugram 122017"],
  ["sector 27 gurugram", "Sector 27, Gurugram 122009"],
  ["sector 28 gurugram", "Sector 28, Gurugram 122002"],
  ["sector 31 gurugram", "Sector 31, Gurugram 122001"],
  ["sector 32 gurugram", "Sector 32, Gurugram 122001"],
  ["sector 37 gurugram", "Sector 37, Gurugram 122004"],
  ["sector 38 gurugram", "Sector 38, Gurugram 122001"],
  ["sector 39 gurugram", "Sector 39, Gurugram 122003"],
  ["sector 40 gurugram", "Sector 40, Gurugram 122001"],
  ["sector 43 gurugram", "Sector 43, Gurugram 122002"],
  ["sector 44 gurugram", "Sector 44, Gurugram 122003"],
  ["sector 45 gurugram", "Sector 45, Gurugram 122003"],
  ["sector 46 gurugram", "Sector 46, Gurugram 122003"],
  ["sector 47 gurugram", "Sector 47, Gurugram 122018"],
  ["sector 48 gurugram", "Sector 48, Gurugram 122018"],
  ["sector 49 gurugram", "Sector 49, Gurugram 122018"],
  ["sector 50 gurugram", "Sector 50, Gurugram 122018"],
  ["sector 51 gurugram", "Sector 51, Gurugram 122003"],
  ["sector 52 gurugram", "Sector 52, Gurugram 122003"],
  ["sector 53 gurugram", "Sector 53, Gurugram 122002"],
  ["sector 54 gurugram", "Sector 54, Gurugram 122002"],
  ["sector 56 gurugram", "Sector 56, Gurugram 122011"],
  ["sector 57 gurugram", "Sector 57, Gurugram 122011"],
  ["sector 65 gurugram", "Sector 65, Gurugram 122102"],
  ["sector 66 gurugram", "Sector 66, Gurugram 122102"],
  ["sector 67 gurugram", "Sector 67, Gurugram 122102"],
  ["sector 70 gurugram", "Sector 70, Gurugram 122101"],
  ["sector 82 gurugram", "Sector 82, Gurugram 122004"],
  ["sector 83 gurugram", "Sector 83, Gurugram 122004"],
  ["sector 84 gurugram", "Sector 84, Gurugram 122004"],
  ["sector 90 gurugram", "Sector 90, Gurugram 122505"],
  ["dlf phase 1 gurugram", "DLF Phase 1, Gurugram 122002"],
  ["dlf phase 2 gurugram", "DLF Phase 2, Gurugram 122008"],
  ["dlf phase 3 gurugram", "DLF Phase 3, Gurugram 122010"],
  ["dlf phase 4 gurugram", "DLF Phase 4, Gurugram 122009"],
  ["dlf phase 5 gurugram", "DLF Phase 5, Gurugram 122002"],
  ["cyber city gurugram", "Cyber City, Gurugram 122002"],
  ["udyog vihar gurugram", "Udyog Vihar, Gurugram 122016"],
  ["golf course road gurugram", "Golf Course Road, Gurugram 122002"],
  ["mg road gurugram", "MG Road, Gurugram 122002"],
  ["palam vihar gurugram", "Palam Vihar, Gurugram 122017"],
  ["sushant lok gurugram", "Sushant Lok, Gurugram 122009"],
  ["nirvana country gurugram", "Nirvana Country, Gurugram 122018"],
  ["new gurgaon", "New Gurgaon 122004"],
  ["manesar gurugram", "Manesar, Gurugram 122051"],
  ["sohna road gurugram", "Sohna Road, Gurugram 122018"],
  ["sector 18 noida", "Sector 18, Noida 201301"],
  ["sector 62 noida", "Sector 62, Noida 201309"],
  ["sector 50 noida", "Sector 50, Noida 201301"],
  ["sector 137 noida", "Sector 137, Noida 201305"],
  ["greater noida west", "Greater Noida West 201306"],
  ["connaught place delhi", "Connaught Place, Delhi 110001"],
  ["chanakyapuri delhi", "Chanakyapuri, Delhi 110021"],
  ["vasant vihar delhi", "Vasant Vihar, Delhi 110057"],
  ["vasant kunj delhi", "Vasant Kunj, Delhi 110070"],
  ["saket delhi", "Saket, Delhi 110017"],
  ["dwarka delhi", "Dwarka, Delhi 110075"],
  ["dwarka sector 6 delhi", "Dwarka Sector 6, Delhi 110075"],
  ["dwarka sector 10 delhi", "Dwarka Sector 10, Delhi 110075"],
  ["dwarka sector 12 delhi", "Dwarka Sector 12, Delhi 110078"],
  ["dwarka sector 21 delhi", "Dwarka Sector 21, Delhi 110077"],
  ["rohini delhi", "Rohini, Delhi 110085"],
  ["rohini sector 7 delhi", "Rohini Sector 7, Delhi 110085"],
  ["rohini sector 15 delhi", "Rohini Sector 15, Delhi 110089"],
  ["pitampura delhi", "Pitampura, Delhi 110034"],
  ["shalimar bagh delhi", "Shalimar Bagh, Delhi 110088"],
  ["janakpuri delhi", "Janakpuri, Delhi 110058"],
  ["lajpat nagar delhi", "Lajpat Nagar, Delhi 110024"],
  ["karol bagh delhi", "Karol Bagh, Delhi 110005"],
  ["preet vihar delhi", "Preet Vihar, Delhi 110092"],
  ["mayur vihar delhi", "Mayur Vihar, Delhi 110091"],
  ["laxmi nagar delhi", "Laxmi Nagar, Delhi 110092"],
  ["rajouri garden delhi", "Rajouri Garden, Delhi 110027"],
  ["punjabi bagh delhi", "Punjabi Bagh, Delhi 110026"],
  ["paschim vihar delhi", "Paschim Vihar, Delhi 110063"],
  ["tilak nagar delhi", "Tilak Nagar, Delhi 110018"],
  ["vikaspuri delhi", "Vikaspuri, Delhi 110018"],
  ["uttam nagar delhi", "Uttam Nagar, Delhi 110059"],
  ["hauz khas delhi", "Hauz Khas, Delhi 110016"],
  ["green park delhi", "Green Park, Delhi 110016"],
  ["greater kailash delhi", "Greater Kailash, Delhi 110048"],
  ["nehru place delhi", "Nehru Place, Delhi 110019"],
  ["malviya nagar delhi", "Malviya Nagar, Delhi 110017"],
  ["okhla delhi", "Okhla, Delhi 110020"],
  ["jasola delhi", "Jasola, Delhi 110025"],
  ["sarita vihar delhi", "Sarita Vihar, Delhi 110076"],
  ["defence colony delhi", "Defence Colony, Delhi 110024"],
  ["south extension delhi", "South Extension, Delhi 110049"],
  ["patel nagar delhi", "Patel Nagar, Delhi 110008"],
  ["rajendra place delhi", "Rajendra Place, Delhi 110008"],
  ["civil lines delhi", "Civil Lines, Delhi 110054"],
  ["model town delhi", "Model Town, Delhi 110009"],
  ["ashok vihar delhi", "Ashok Vihar, Delhi 110052"],
  ["karol bagh delhi", "Karol Bagh, Delhi 110005"],
  ["chandni chowk delhi", "Chandni Chowk, Delhi 110006"],
  ["daryaganj delhi", "Daryaganj, Delhi 110002"],
  ["khan market delhi", "Khan Market, Delhi 110003"],
  ["india gate delhi", "India Gate, Delhi 110001"],
  ["aerocity delhi", "Aerocity, Delhi 110037"],
  ["ghaziabad indirapuram", "Indirapuram, Ghaziabad 201014"],
  ["faridabad sector 15", "Sector 15, Faridabad 121007"],
  ...Array.from({ length: 18 }, (_, index) => {
    const pin = String(122001 + index);
    return [`gurugram ${pin}`, `Gurugram ${pin}`];
  }),
  ...Array.from({ length: 96 }, (_, index) => {
    const pin = String(110001 + index).padStart(6, "0");
    return [`delhi ${pin}`, `Delhi ${pin}`];
  })
];

const emptyForm = {
  name: "",
  phone: "",
  location: "",
  requirement: "",
  priceMismatchRange: "",
  category: [],
  buyingDriver: [],
  techKnowledge: [],
  decisionMaker: [],
  brandTier: [],
  desiredBrand: [],
  walkoutReason: [],
  competitor: [],
  priceGap: [],
  financialHook: [],
  storeSource: []
};

const navItems = [
  { key: "agent", label: "Agent Input Portal", icon: ClipboardList },
  { key: "dashboard", label: "Manager Dashboard", icon: BarChart3 },
  { key: "engine", label: "Auto-Targeting Engine", icon: BrainCircuit }
];

function rupees(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

function cleanPhone(phone) {
  return phone.replace(/\D/g, "").slice(-10);
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return [value];
}

function hasChoice(value, choice) {
  return asArray(value).includes(choice);
}

function primaryChoice(value, fallback = "") {
  return asArray(value)[0] || fallback;
}

function displayValue(value, fallback = "Not captured") {
  const values = asArray(value);
  return values.length ? values.join(", ") : fallback;
}

function normalizeText(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function resolveLocation(value) {
  const normalized = normalizeText(value);
  const match = locationSuggestions.find(([key]) => normalized.includes(normalizeText(key)) || normalizeText(key).includes(normalized));
  return match && normalized.length > 6 ? match[1] : value;
}

function numericPrice(value) {
  const parsed = Number(String(value || "").replace(/[^0-9]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function countChoices(items, field) {
  const counts = items.reduce((acc, item) => {
    asArray(item[field]).forEach((choice) => {
      acc[choice] = (acc[choice] || 0) + 1;
    });
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

function customerDate(customer) {
  return customer.createdAtIso ? new Date(customer.createdAtIso) : new Date();
}

function isWithinRange(customer, range) {
  if (range === "all") return true;
  const now = new Date();
  const date = customerDate(customer);
  const ageMs = now.getTime() - date.getTime();
  if (range === "today") return date.toDateString() === now.toDateString();
  if (range === "week") return ageMs <= 7 * 24 * 60 * 60 * 1000;
  if (range === "month") return ageMs <= 30 * 24 * 60 * 60 * 1000;
  return true;
}

function generatePersona(form) {
  if (hasChoice(form.category, "Gaming")) return "Gaming Seeker";
  if (hasChoice(form.buyingDriver, "Corporate")) return "Corporate Buyer";
  if (hasChoice(form.techKnowledge, "Needs Guidance")) return "Guided Shopper";
  if (hasChoice(form.brandTier, "Premium")) return "Premium Seeker";
  if (hasChoice(form.walkoutReason, "Online Price Mismatch")) return "Price Watcher";
  return `${primaryChoice(form.brandTier, "Retail")} ${primaryChoice(form.buyingDriver, "Buyer")}`;
}

function estimatedValueFor(category, brandTier, priceMismatchRange = "") {
  const direct = numericPrice(priceMismatchRange);
  if (direct) return direct;

  const selectedCategory = primaryChoice(category, "Mobile");
  const selectedTier = primaryChoice(brandTier, "Mainstream");
  const valueMap = {
    Mobile: {
      Budget: 18000,
      Mainstream: 30000,
      Premium: 45000,
      Undecided: 28000
    },
    Wearables: {
      Budget: 5000,
      Mainstream: 12000,
      Premium: 30000,
      Undecided: 10000
    },
    "Laptop/IT": {
      Budget: 32000,
      Mainstream: 55000,
      Premium: 85000,
      Undecided: 52000
    },
    "Home Appliances": {
      Budget: 18000,
      Mainstream: 42000,
      Premium: 90000,
      Undecided: 38000
    },
    Gaming: {
      Budget: 45000,
      Mainstream: 85000,
      Premium: 140000,
      Undecided: 75000
    },
    "New Age Gadgets": {
      Budget: 8000,
      Mainstream: 25000,
      Premium: 60000,
      Undecided: 22000
    }
  };
  return valueMap[selectedCategory]?.[selectedTier] || valueMap.Mobile.Mainstream;
}

function profileMessage(customer) {
  const solutionMap = {
    "Exchange Bonus": "We can unlock an exchange bonus evaluation and improve the final payable price",
    "No-Cost EMI": "We can arrange a no-cost EMI option with quick in-store approval",
    "Credit Card Discount": "A fresh card discount can reduce your checkout price today",
    "Extended Warranty": "We can include extended warranty value in the final recommendation"
  };

  const hook = primaryChoice(customer.financialHook, "No-Cost EMI");
  return `Hi ${customer.name}, this is Reliance Digital. You had checked ${displayValue(customer.category)} today. ${solutionMap[hook]}. Shall I keep the option ready for you?`;
}

function triggerFit(customer, campaign) {
  const reasons = [];

  if (campaign.categoryFilter !== anyOption && !hasChoice(customer.category, campaign.categoryFilter)) return null;
  if (campaign.brandFilter !== anyOption && !hasChoice(customer.brandTier, campaign.brandFilter)) return null;
  if (campaign.driverFilter !== anyOption && !hasChoice(customer.buyingDriver, campaign.driverFilter)) return null;

  if (campaign.triggerType === "New Card Discount") {
    if (hasChoice(customer.walkoutReason, "Card Issue")) reasons.push("card issue");
    if (hasChoice(customer.financialHook, "Credit Card Discount")) reasons.push("card discount hook");
  }
  if (campaign.triggerType === "Stock Replenished" && (hasChoice(customer.walkoutReason, "Color Not Available") || hasChoice(customer.walkoutReason, "Model Not Available"))) {
    reasons.push("availability issue");
  }
  if (campaign.triggerType === "Price Drop") {
    if (hasChoice(customer.walkoutReason, "Online Price Mismatch")) reasons.push("online price mismatch");
    if (!hasChoice(customer.priceGap, "Not a price issue")) reasons.push(`${displayValue(customer.priceGap)} price gap`);
  }
  if (campaign.triggerType === "General Festival Offer" && displayValue(customer.category, "") !== "") {
    reasons.push("category captured");
  }
  if (campaign.triggerType === "Exchange Upgrade" && hasChoice(customer.financialHook, "Exchange Bonus")) {
    reasons.push("exchange bonus interest");
  }
  if (campaign.triggerType === "EMI Rescue") {
    if (hasChoice(customer.walkoutReason, "Finance Issue")) reasons.push("finance issue");
    if (hasChoice(customer.financialHook, "No-Cost EMI")) reasons.push("EMI preference");
  }
  if (campaign.triggerType === "Competitor Winback" && !hasChoice(customer.competitor, "No comparison")) {
    reasons.push(`compared with ${displayValue(customer.competitor)}`);
  }
  if (campaign.triggerType === "Premium Upgrade" && (hasChoice(customer.brandTier, "Premium") || hasChoice(customer.techKnowledge, "Status-Driven"))) {
    reasons.push(hasChoice(customer.brandTier, "Premium") ? "premium intent" : "status-driven buyer");
  }
  if (campaign.triggerType === "Guidance Callback" && hasChoice(customer.techKnowledge, "Needs Guidance")) {
    reasons.push("needs guided consultation");
  }

  if (!reasons.length) return null;

  const score =
    55 +
    reasons.length * 12 +
    (hasChoice(customer.priceGap, "Above 5%") ? 7 : 0) +
    (hasChoice(customer.brandTier, "Premium") ? 5 : 0);

  return {
    ...customer,
    matchScore: Math.min(score, 98),
    matchReasons: reasons
  };
}

function campaignMessage(customer, campaignDetails, triggerType) {
  const detail = campaignDetails || triggerType;
  const hookLine = {
    "Exchange Bonus": "We can also check an exchange bonus to improve your final price.",
    "No-Cost EMI": "We can include a no-cost EMI option in the quote.",
    "Credit Card Discount": "We can apply the relevant card discount if your bank is eligible.",
    "Extended Warranty": "We can include extended warranty value in the final recommendation."
  }[primaryChoice(customer.financialHook, "No-Cost EMI")];
  const objectionLine = {
    "Online Price Mismatch": "Since you were comparing online prices, I will include the current store-best offer.",
    "Color Not Available": "Since color availability was the blocker, I will confirm matching color options before you visit.",
    "Model Not Available": "Since model availability was the blocker, I will confirm the closest matching model before you visit.",
    "Finance Issue": "Since finance approval was the blocker, I will include finance options in the message.",
    "Card Issue": "Since card offer/payment was the blocker, I will include eligible card options.",
    "Just Browsing": "Since you were exploring options, I will keep this short and useful.",
    "Brand Preference": "Since brand preference mattered, I will share the closest matching option.",
    "Exchange Concern": "Since exchange value mattered, I will include the exchange estimate path.",
    "Service Concern": "Since service support mattered, I will include warranty and service assistance details.",
    "Budget Constraint": "Since budget was the concern, I will focus on the best-value options.",
    "Price Sensitive": "Since pricing was important, I will include the strongest current offer.",
    "Stock Issue": "Since stock was the blocker, I will confirm availability before you visit."
  }[primaryChoice(customer.walkoutReason, "Just Browsing")] || "Based on your store visit, I will keep this relevant and specific.";
  const triggerLine = {
    "New Card Discount": "A new card-linked saving is live now.",
    "Stock Replenished": "The stock situation has changed in your favour.",
    "Price Drop": "There is a price movement worth checking.",
    "General Festival Offer": "A new store offer is live.",
    "Exchange Upgrade": "There is an exchange-led upgrade opportunity.",
    "EMI Rescue": "There is a payment-friendly option available now.",
    "Competitor Winback": "We can try to beat or match the value you saw elsewhere.",
    "Premium Upgrade": "There is a premium option that fits your preference.",
    "Guidance Callback": "A guided recommendation can help close the decision."
  }[triggerType];

  return `Hi ${customer.name}, this is Reliance Digital. ${triggerLine} ${detail} for ${displayValue(customer.category)}. ${objectionLine} ${hookLine} Reply YES and I will share the exact quote and availability.`;
}

async function sendWhatsAppMessage({ phone, message, customerName }) {
  const response = await fetch("/api/whatsapp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, message, customerName })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || data.error || "WhatsApp send failed");
  }
  return data;
}

function App() {
  const [activePanel, setActivePanel] = useState("agent");
  const [customers, setCustomers] = useState(initialCustomers);
  const [storageStatus, setStorageStatus] = useState("Loading shared data...");
  const [analyticsRange, setAnalyticsRange] = useState("week");
  const [form, setForm] = useState(emptyForm);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [campaign, setCampaign] = useState({
    triggerType: "New Card Discount",
    details: "Flat 10% off on HDFC Cards",
    categoryFilter: anyOption,
    brandFilter: anyOption,
    driverFilter: anyOption
  });
  const [matches, setMatches] = useState([]);
  const [hasRunCampaign, setHasRunCampaign] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadCustomers() {
      try {
        const response = await fetch("/api/customers");
        const data = await response.json();
        if (!active) return;

        if (Array.isArray(data.customers)) {
          setCustomers(data.customers);
        }

        setStorageStatus(
          data.storage === "vercel-kv"
            ? "Shared database connected"
            : "Demo data loaded - connect Vercel KV for shared storage"
        );
      } catch {
        if (!active) return;
        const localCustomers = window.localStorage.getItem("retail-marketing-tool-customers");
        if (localCustomers) {
          setCustomers(JSON.parse(localCustomers));
          setStorageStatus("Local browser storage active");
        } else {
          setStorageStatus("Demo data loaded");
        }
      }
    }

    loadCustomers();
    return () => {
      active = false;
    };
  }, []);

  const dashboardCustomers = useMemo(
    () => customers.filter((customer) => isWithinRange(customer, analyticsRange)),
    [customers, analyticsRange]
  );

  const actionableDashboardCustomers = useMemo(
    () => dashboardCustomers.filter((customer) => !hasChoice(customer.walkoutReason, "Just Browsing")),
    [dashboardCustomers]
  );

  const topWalkoutReason = useMemo(() => {
    const counts = actionableDashboardCustomers.reduce((acc, customer) => {
      asArray(customer.walkoutReason).forEach((reason) => {
        if (!reason || reason === "Just Browsing") return;
        acc[reason] = (acc[reason] || 0) + 1;
      });
      return acc;
    }, {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "No data";
  }, [actionableDashboardCustomers]);

  const revenueAtRisk = useMemo(
    () => actionableDashboardCustomers.reduce((sum, customer) => sum + customer.estimatedValue, 0),
    [actionableDashboardCustomers]
  );

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleFormChoice(field, option) {
    setForm((current) => {
      const values = asArray(current[field]);
      const nextValues = values.includes(option)
        ? values.filter((value) => value !== option)
        : [...values, option];
      return { ...current, [field]: nextValues };
    });
  }

  function updateLocation(value) {
    setForm((current) => ({ ...current, location: value }));
  }

  function resolveTypedLocation() {
    setForm((current) => ({ ...current, location: resolveLocation(current.location) }));
  }

  async function submitInsight(event) {
    event.preventDefault();
    const name = form.name.trim() || "Walk-in Customer";
    const phone = cleanPhone(form.phone);

    const newCustomer = {
      ...form,
      id: Date.now(),
      name,
      phone,
      personaTag: generatePersona(form),
      createdAt: "Just now",
      createdAtIso: new Date().toISOString(),
      estimatedValue: estimatedValueFor(form.category, form.brandTier, form.priceMismatchRange)
    };

    const optimisticCustomers = [newCustomer, ...customers];
    setCustomers(optimisticCustomers);
    window.localStorage.setItem("retail-marketing-tool-customers", JSON.stringify(optimisticCustomers));

    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: newCustomer })
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.detail || data.error || "Save failed");
      if (Array.isArray(data.customers)) setCustomers(data.customers);
      setStorageStatus("Shared database connected");
    } catch {
      setStorageStatus("Saved locally - connect Vercel KV for all-device storage");
    }

    setForm(emptyForm);
    setActivePanel("dashboard");
  }

  function runMatchingAlgorithm() {
    const filtered = customers
      .map((customer) => triggerFit(customer, campaign))
      .filter(Boolean)
      .sort((a, b) => b.matchScore - a.matchScore);

    setMatches(filtered);
    setHasRunCampaign(true);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-reliance-line bg-white px-5 py-6 lg:block">
          <BrandBlock />
          <nav className="mt-8 space-y-2">
            {navItems.map((item) => (
              <NavButton
                key={item.key}
                item={item}
                active={activePanel === item.key}
                onClick={() => setActivePanel(item.key)}
              />
            ))}
          </nav>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-reliance-line bg-white/95 px-4 py-3 backdrop-blur lg:px-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 lg:hidden">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-reliance-blue text-white">
                  <Store className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-reliance-deep">Smart Retail Marketing Tool</p>
                </div>
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium uppercase tracking-wide text-reliance-blue">Reliance Digital Inspired</p>
                <h1 className="text-2xl font-bold text-slate-950">Smart Retail Marketing Tool</h1>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-reliance-line bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                <UsersRound className="h-4 w-4 text-reliance-blue" />
                {customers.length} active leads
              </div>
            </div>
            <nav className="mt-3 grid grid-cols-3 gap-2 lg:hidden">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActivePanel(item.key)}
                  className={`flex h-12 items-center justify-center rounded-lg border text-xs font-semibold transition ${
                    activePanel === item.key
                      ? "border-reliance-blue bg-reliance-blue text-white"
                      : "border-reliance-line bg-white text-slate-600"
                  }`}
                  aria-label={item.label}
                  title={item.label}
                >
                  <item.icon className="h-5 w-5" />
                </button>
              ))}
            </nav>
          </header>

          <div className="flex-1 px-4 py-5 lg:px-8 lg:py-8">
            {activePanel === "agent" && (
              <AgentPortal form={form} updateForm={updateForm} updateLocation={updateLocation} resolveTypedLocation={resolveTypedLocation} toggleFormChoice={toggleFormChoice} submitInsight={submitInsight} />
            )}
            {activePanel === "dashboard" && (
              <ManagerDashboard
                customers={dashboardCustomers}
                allCustomers={customers}
                analyticsRange={analyticsRange}
                setAnalyticsRange={setAnalyticsRange}
                topWalkoutReason={topWalkoutReason}
                revenueAtRisk={revenueAtRisk}
                onView={setSelectedCustomer}
              />
            )}
            {activePanel === "engine" && (
              <MarketingEngine
                campaign={campaign}
                setCampaign={setCampaign}
                matches={matches}
                hasRunCampaign={hasRunCampaign}
                runMatchingAlgorithm={runMatchingAlgorithm}
              />
            )}
          </div>
        </main>
      </div>

      {selectedCustomer && (
        <ProfileModal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
      )}
    </div>
  );
}

function BrandBlock() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-reliance-blue text-white shadow-soft">
        <Store className="h-6 w-6" />
      </div>
      <div>
        <p className="text-base font-bold text-reliance-deep">Smart Retail Marketing Tool</p>
      </div>
    </div>
  );
}

function NavButton({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${
        active
          ? "bg-reliance-blue text-white shadow-soft"
          : "text-slate-600 hover:bg-slate-100 hover:text-reliance-deep"
      }`}
    >
      <span className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        {item.label}
      </span>
      <ChevronRight className="h-4 w-4" />
    </button>
  );
}

function SectionShell({ eyebrow, title, subtitle, icon: Icon, children, compact = false }) {
  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-reliance-blue">
            <Icon className="h-4 w-4" />
            {eyebrow}
          </div>
          <h2 className={`${compact ? "text-2xl" : "text-3xl"} mt-2 font-bold text-slate-950`}>{title}</h2>
          <p className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-500">
            Made By Anjali - Reliance Retail Intern
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}

function AgentPortal({ form, updateForm, updateLocation, resolveTypedLocation, toggleFormChoice, submitInsight }) {
  return (
    <SectionShell
      eyebrow="Panel 1"
      title="Agent Input Portal"
      subtitle="Fast floor-staff capture for walkout insights, tuned for mobile counters and handheld use."
      icon={ClipboardList}
    >
      <div className="mx-auto grid max-w-6xl gap-5">
        <div className="rounded-lg border border-reliance-line bg-white p-4 shadow-sm md:flex md:items-center md:justify-between md:gap-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-reliance-sky text-reliance-blue">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-950">Predicted Persona</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">Generated from whatever the agent is able to capture.</p>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-dashed border-reliance-line bg-slate-50 px-4 py-3 md:mt-0 md:min-w-64">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Preview</p>
            <p className="mt-1 text-xl font-bold text-reliance-deep">{generatePersona(form)}</p>
          </div>
        </div>
        <form onSubmit={submitInsight} className="rounded-lg border border-reliance-line bg-white p-4 shadow-sm md:p-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <TextField label="Customer Name" value={form.name} onChange={(value) => updateForm("name", value)} icon={UserRound} />
            <TextField label="Number" value={form.phone} onChange={(value) => updateForm("phone", value)} icon={Phone} inputMode="numeric" />
            <LocationField value={form.location} onChange={updateLocation} onResolve={resolveTypedLocation} />
            <MultiOptionField label="Q1. Product Category" value={form.category} options={categories} onToggle={(value) => toggleFormChoice("category", value)} />
            <MultiOptionField label="Q2. Buying Driver" value={form.buyingDriver} options={buyingDrivers} onToggle={(value) => toggleFormChoice("buyingDriver", value)} />
            <MultiOptionField label="Q3. Tech Knowledge" value={form.techKnowledge} options={techKnowledge} onToggle={(value) => toggleFormChoice("techKnowledge", value)} />
            <TextField label="Specific Demand" value={form.requirement} onChange={(value) => updateForm("requirement", value)} icon={ClipboardList} />
            <MultiOptionField label="Q4. Brand Tier" value={form.brandTier} options={brandTiers} onToggle={(value) => toggleFormChoice("brandTier", value)} />
            <MultiOptionField label="Q5. Store Discovery Source" value={form.storeSource} options={storeSources} onToggle={(value) => toggleFormChoice("storeSource", value)} />
            <MultiOptionField label="Q6. Desired Brand" value={form.desiredBrand} options={desiredBrands} onToggle={(value) => toggleFormChoice("desiredBrand", value)} scrollable />
            <MultiOptionField label="Q7. Walkout Reason" value={form.walkoutReason} options={walkoutReasons} onToggle={(value) => toggleFormChoice("walkoutReason", value)} scrollable />
            <MultiOptionField label="Q8. Competitor / Brand Store" value={form.competitor} options={competitors} onToggle={(value) => toggleFormChoice("competitor", value)} scrollable />
            <TextField label="Price Mismatch Range" value={form.priceMismatchRange} onChange={(value) => updateForm("priceMismatchRange", value)} icon={IndianRupee} inputMode="numeric" />
            <MultiOptionField label="Q9. Financial Hook" value={form.financialHook} options={financialHooks} onToggle={(value) => toggleFormChoice("financialHook", value)} />
            <MultiOptionField label="Q10. Decision Maker" value={form.decisionMaker} options={decisionMakers} onToggle={(value) => toggleFormChoice("decisionMaker", value)} />
          </div>
          <button
            type="submit"
            className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-reliance-blue px-5 text-base font-bold text-white shadow-soft transition hover:bg-reliance-deep focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <PlusCircle className="h-5 w-5" />
            Log Customer Insight
          </button>
        </form>
      </div>
    </SectionShell>
  );
}

function LocationField({ value, onChange, onResolve }) {
  const [open, setOpen] = useState(false);
  const normalized = normalizeText(value);
  const suggestions = locationSuggestions
    .map(([, label]) => label)
    .filter((label) => !normalized || normalizeText(label).includes(normalized) || normalized.includes(normalizeText(label).slice(0, 8)));
  const visibleSuggestions = suggestions.length ? suggestions : locationSuggestions.map(([, label]) => label);

  return (
    <label className="relative block">
      <span className="text-sm font-semibold text-slate-700">Location</span>
      <span className="mt-2 flex h-12 items-center gap-3 rounded-lg border border-reliance-line bg-white px-3 focus-within:border-reliance-blue focus-within:ring-4 focus-within:ring-blue-100">
        <Store className="h-4 w-4 shrink-0 text-reliance-blue" />
        <input
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setOpen(false), 140);
            onResolve();
          }}
          className="min-w-0 flex-1 border-0 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
          placeholder="Sector 29 Gurugram / Delhi / Noida"
        />
      </span>
      {open && (
        <div className="absolute left-0 right-0 top-[76px] z-30 max-h-56 overflow-y-auto rounded-lg border border-reliance-line bg-white p-2 shadow-soft">
          {visibleSuggestions.map((label, index) => (
            <button
              key={`${label}-${index}`}
              type="button"
              onPointerDown={(event) => event.preventDefault()}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                onChange(label);
                setOpen(false);
              }}
              className="block min-h-10 w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-reliance-sky hover:text-reliance-deep"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </label>
  );
}

function TextField({ label, value, onChange, onBlur, icon: Icon, inputMode = "text" }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <span className="mt-2 flex h-12 items-center gap-3 rounded-lg border border-reliance-line bg-white px-3 focus-within:border-reliance-blue focus-within:ring-4 focus-within:ring-blue-100">
        <Icon className="h-4 w-4 shrink-0 text-reliance-blue" />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          inputMode={inputMode}
          className="min-w-0 flex-1 border-0 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
          placeholder={label}
        />
      </span>
    </label>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-lg border border-reliance-line bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-reliance-blue focus:ring-4 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function MultiOptionField({ label, value, options, onToggle, optional = false, scrollable = false }) {
  const selected = asArray(value);

  return (
    <fieldset className="block">
      <div className="flex items-center justify-between gap-2">
        <legend className="text-sm font-semibold text-slate-700">{label}</legend>
        {optional && <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500">Optional</span>}
      </div>
      <div className={`mt-2 grid gap-2 sm:grid-cols-2 ${scrollable ? "max-h-36 overflow-y-auto pr-1" : ""}`}>
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`min-h-11 rounded-lg border px-3 py-2 text-left text-sm font-semibold leading-5 break-words transition ${
                isSelected
                  ? "border-reliance-blue bg-reliance-blue text-white shadow-sm"
                  : "border-reliance-line bg-white text-slate-700 hover:border-reliance-blue hover:bg-reliance-sky"
              }`}
              aria-pressed={isSelected}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function ManagerDashboard({ customers, allCustomers, analyticsRange, setAnalyticsRange, topWalkoutReason, revenueAtRisk, onView }) {
  const financeBlockers = customers.filter((customer) => hasChoice(customer.walkoutReason, "Finance Issue")).length;
  const cardBlockers = customers.filter((customer) => hasChoice(customer.walkoutReason, "Card Issue")).length;
  const highPriceGap = customers.filter((customer) => hasChoice(customer.priceGap, "Above 5%")).length;
  const actionableCustomers = customers.filter((customer) => !hasChoice(customer.walkoutReason, "Just Browsing"));
  const metrics = [
    { label: "Filtered Walkouts", value: customers.length, icon: UsersRound, note: `${allCustomers.length} total stored leads` },
    { label: "Top Walkout Reason", value: topWalkoutReason, icon: Search, note: "Highest frequency signal" },
    { label: "Actionable Leads", value: actionableCustomers.length, icon: TrendingUp, note: "Excludes Just Browsing" },
    { label: "Finance + Card Issues", value: financeBlockers + cardBlockers, icon: TrendingUp, note: "Payment friction cases" }
  ];
  const walkoutData = countChoices(actionableCustomers, "walkoutReason");
  const categoryData = countChoices(customers, "category");
  const brandData = countChoices(customers, "brandTier");
  const competitorData = countChoices(customers, "competitor");
  const desiredBrandData = countChoices(customers, "desiredBrand");

  return (
    <SectionShell
      eyebrow="Panel 2"
      title="Manager Dashboard"
      subtitle="A desktop-first command surface for store managers to see live lead quality, recovery risk, and retargeting actions."
      icon={BarChart3}
      compact
    >
      <div className="mb-5 flex flex-col gap-3 rounded-lg border border-reliance-line bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-950">Analytics Window</h3>
          <p className="text-sm text-slate-500">Filter every metric, chart, and customer row by time period.</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            ["today", "Daily"],
            ["week", "Weekly"],
            ["month", "Monthly"],
            ["all", "All"]
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setAnalyticsRange(value)}
              className={`h-10 rounded-lg px-3 text-sm font-bold transition ${
                analyticsRange === value ? "bg-reliance-blue text-white" : "bg-slate-100 text-slate-600 hover:bg-reliance-sky"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <InsightCard label="Finance Issues" value={financeBlockers} helper="Customers blocked by loan, EMI, or approval friction" />
        <InsightCard label="Card Issues" value={cardBlockers} helper="Customers blocked by card offer or payment eligibility" />
        <InsightCard label="High Price-Gap Cases" value={highPriceGap} helper="Above 5% price mismatch signals" />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.15fr_1fr]">
        <ChartPanel title="Walkout Reason Mix" subtitle="Share of objections captured by floor staff">
          <DonutChart data={walkoutData} />
        </ChartPanel>
        <ChartPanel title="Category Demand" subtitle="Which product zones are leaking buyers">
          <BarChart data={categoryData} />
        </ChartPanel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ChartPanel title="Brand Tier Intent" subtitle="Premium, mainstream and budget split">
          <HorizontalBars data={brandData} />
        </ChartPanel>
        <ChartPanel title="Desired Brand Preference" subtitle="Brands customers explicitly asked for">
          <HorizontalBars data={desiredBrandData} />
        </ChartPanel>
      </div>

      <div className="mt-4">
        <ChartPanel title="Competitor Pressure" subtitle="Where customers are comparing before purchase">
          <HorizontalBars data={competitorData} />
        </ChartPanel>
      </div>

      <div className="mt-4">
        <InsightCard label="Potential Reach" value={rupees(revenueAtRisk)} helper="Estimated basket value of actionable leads only, excluding Just Browsing" />
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-reliance-line bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-reliance-line px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-950">Logged Customers</h3>
            <p className="text-sm text-slate-500">Floor activity refreshes instantly after each agent submission.</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-reliance-sky px-3 py-2 text-sm font-semibold text-reliance-deep">
            <CheckCircle2 className="h-4 w-4" />
            Browser state active
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1040px] w-full text-left">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">City / Pin</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Persona Tag</th>
                <th className="px-4 py-3">Walkout Reason</th>
                <th className="px-4 py-3">Desired Brand</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="bg-white align-middle transition hover:bg-slate-50">
                  <td className="px-4 py-4">
                    <div className="font-bold text-slate-900">{customer.name}</div>
                    <div className="text-xs text-slate-500">{customer.createdAt}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">{customer.location || "Not captured"}</td>
                  <td className="px-4 py-4 text-sm font-medium text-slate-700">{displayValue(customer.category)}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex rounded-lg bg-reliance-sky px-3 py-1 text-sm font-bold text-reliance-deep">
                      {customer.personaTag}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">{displayValue(customer.walkoutReason)}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">
                      {displayValue(customer.desiredBrand)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => onView(customer)}
                      className="inline-flex h-10 items-center gap-2 rounded-lg border border-reliance-blue px-3 text-sm font-bold text-reliance-blue transition hover:bg-reliance-blue hover:text-white"
                    >
                      <MessageCircle className="h-4 w-4" />
                      View Profile & Retarget
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionShell>
  );
}

function MetricCard({ label, value, icon: Icon, note }) {
  return (
    <div className="rounded-lg border border-reliance-line bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-reliance-sky text-reliance-blue">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500">{note}</p>
    </div>
  );
}

function InsightCard({ label, value, helper }) {
  return (
    <div className="rounded-lg border border-reliance-line bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-reliance-deep">{value}</p>
      <p className="mt-2 text-sm leading-5 text-slate-500">{helper}</p>
    </div>
  );
}

function ChartPanel({ title, subtitle, children }) {
  return (
    <div className="rounded-lg border border-reliance-line bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-950">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

const chartColors = ["#0053A6", "#2E90FA", "#12B76A", "#F79009", "#7A5AF8", "#F04438"];

function DonutChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  let cumulative = 0;
  const gradient = data
    .map((item, index) => {
      const start = (cumulative / total) * 100;
      cumulative += item.value;
      const end = (cumulative / total) * 100;
      return `${chartColors[index % chartColors.length]} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <div className="grid gap-5 md:grid-cols-[190px_1fr] md:items-center">
      <div className="relative mx-auto h-44 w-44 rounded-full" style={{ background: `conic-gradient(${gradient || "#D8E3EF 0% 100%"})` }}>
        <div className="absolute inset-8 flex flex-col items-center justify-center rounded-full bg-white text-center shadow-inner">
          <span className="text-3xl font-bold text-slate-950">{total}</span>
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">signals</span>
        </div>
      </div>
      <ChartLegend data={data} total={total} />
    </div>
  );
}

function ChartLegend({ data, total }) {
  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={item.label} className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: chartColors[index % chartColors.length] }} />
            <span className="truncate text-sm font-semibold text-slate-700">{item.label}</span>
          </div>
          <span className="text-sm font-bold text-slate-950">{Math.round((item.value / total) * 100)}%</span>
        </div>
      ))}
    </div>
  );
}

function BarChart({ data }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="flex h-60 items-end gap-3 border-b border-l border-reliance-line px-3 pt-4">
      {data.map((item, index) => (
        <div key={item.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
          <div className="flex h-44 w-full items-end">
            <div
              className="w-full rounded-t-lg transition"
              style={{
                height: `${Math.max((item.value / max) * 100, 10)}%`,
                backgroundColor: chartColors[index % chartColors.length]
              }}
              title={`${item.label}: ${item.value}`}
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-950">{item.value}</p>
            <p className="max-w-[120px] truncate text-xs font-semibold text-slate-500" title={item.label}>{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function HorizontalBars({ data }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={item.label}>
          <div className="mb-1 flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-slate-700">{item.label}</span>
            <span className="text-sm font-bold text-slate-950">{item.value}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.max((item.value / max) * 100, 8)}%`,
                backgroundColor: chartColors[index % chartColors.length]
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfileModal({ customer, onClose }) {
  const message = profileMessage(customer);
  const waUrl = `https://wa.me/91${cleanPhone(customer.phone)}?text=${encodeURIComponent(message)}`;
  const [sendState, setSendState] = useState({ status: "idle", message: "" });
  const detailRows = [
    ["WhatsApp", customer.phone],
    ["City / Pin Code", customer.location || "Not captured"],
    ["Requirement", customer.requirement || "Not captured"],
    ["Price Mismatch Range", customer.priceMismatchRange ? rupees(numericPrice(customer.priceMismatchRange)) : "Not captured"],
    ["Product Category", displayValue(customer.category)],
    ["Buying Driver", displayValue(customer.buyingDriver)],
    ["Tech Knowledge", displayValue(customer.techKnowledge)],
    ["Decision Maker", displayValue(customer.decisionMaker)],
    ["Brand Tier", displayValue(customer.brandTier)],
    ["Desired Brand", displayValue(customer.desiredBrand)],
    ["Walkout Reason", displayValue(customer.walkoutReason)],
    ["Competitor", displayValue(customer.competitor)],
    ["Price Gap", displayValue(customer.priceGap)],
    ["Financial Hook", displayValue(customer.financialHook)],
    ["Store Discovery", displayValue(customer.storeSource)]
  ];

  async function sendFromPortal() {
    setSendState({ status: "sending", message: "Sending WhatsApp..." });
    try {
      const result = await sendWhatsAppMessage({ phone: customer.phone, message, customerName: customer.name });
      setSendState({ status: "sent", message: `Sent successfully${result.messageId ? ` (${result.messageId})` : ""}` });
    } catch (error) {
      setSendState({ status: "error", message: error.message });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b border-reliance-line p-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-reliance-blue">Customer Recovery Profile</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-950">{customer.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{customer.personaTag} · {rupees(customer.estimatedValue)} at risk</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-reliance-line text-slate-500 hover:bg-slate-100"
            aria-label="Close modal"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid max-h-[calc(92vh-92px)] gap-5 overflow-y-auto p-5 lg:grid-cols-[1fr_300px]">
          <div className="grid gap-3 sm:grid-cols-2">
            {detailRows.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-reliance-line bg-slate-50 p-3">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-reliance-line bg-reliance-sky p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-reliance-blue">
              <MessageCircle className="h-5 w-5" />
            </div>
            <h4 className="mt-4 text-lg font-bold text-slate-950">WhatsApp Draft</h4>
            <p className="mt-3 rounded-lg bg-white p-3 text-sm leading-6 text-slate-700">{message}</p>
            <button
              type="button"
              onClick={sendFromPortal}
              disabled={sendState.status === "sending"}
              className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-reliance-blue px-4 text-sm font-bold text-white transition enabled:hover:bg-reliance-deep disabled:cursor-wait disabled:bg-slate-400"
            >
              <Send className="h-4 w-4" />
              {sendState.status === "sending" ? "Sending..." : "Send from Portal"}
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-reliance-blue bg-white px-4 text-sm font-bold text-reliance-blue transition hover:bg-reliance-sky"
            >
              Open WhatsApp Fallback
            </a>
            {sendState.message && (
              <p className={`mt-3 rounded-lg px-3 py-2 text-xs font-bold leading-5 ${
                sendState.status === "error" ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"
              }`}>
                {sendState.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketingEngine({ campaign, setCampaign, matches, hasRunCampaign, runMatchingAlgorithm }) {
  const updateCampaign = (field, value) => setCampaign((current) => ({ ...current, [field]: value }));
  const [sendStates, setSendStates] = useState({});
  const [bulkState, setBulkState] = useState({ status: "idle", message: "" });

  async function sendCampaignCustomer(customer) {
    const message = campaignMessage(customer, campaign.details, campaign.triggerType);
    setSendStates((current) => ({ ...current, [customer.id]: { status: "sending", message: "Sending..." } }));
    try {
      const result = await sendWhatsAppMessage({ phone: customer.phone, message, customerName: customer.name });
      setSendStates((current) => ({
        ...current,
        [customer.id]: { status: "sent", message: `Sent${result.messageId ? ` (${result.messageId})` : ""}` }
      }));
      return { ok: true };
    } catch (error) {
      setSendStates((current) => ({ ...current, [customer.id]: { status: "error", message: error.message } }));
      return { ok: false };
    }
  }

  async function sendAllMatches() {
    setBulkState({ status: "sending", message: "Sending campaign messages..." });
    let sent = 0;
    let failed = 0;

    for (const customer of matches) {
      const result = await sendCampaignCustomer(customer);
      if (result.ok) sent += 1;
      else failed += 1;
    }

    setBulkState({
      status: failed ? "error" : "sent",
      message: failed ? `${sent} sent, ${failed} failed` : `${sent} WhatsApp messages sent`
    });
  }

  return (
    <SectionShell
      eyebrow="Panel 3"
      title="Auto-Targeting & Marketing Engine"
      subtitle="Campaign triggers scan walkout insights, rank customers by fit, and auto-draft personalized WhatsApp follow-ups."
      icon={BrainCircuit}
      compact
    >
      <div className="grid gap-6 xl:grid-cols-[440px_1fr]">
        <div className="rounded-lg border border-reliance-line bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-reliance-blue text-white">
              <Megaphone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-950">Create New Campaign Trigger</h3>
              <p className="text-sm text-slate-500">Choose the signal, refine the audience, then generate drafts.</p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <SelectField
              label="Trigger Type"
              value={campaign.triggerType}
              options={triggerTypes}
              onChange={(value) => updateCampaign("triggerType", value)}
            />
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Campaign Details</span>
              <input
                value={campaign.details}
                onChange={(event) => updateCampaign("details", event.target.value)}
                className="mt-2 h-12 w-full rounded-lg border border-reliance-line bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-reliance-blue focus:ring-4 focus:ring-blue-100"
                placeholder="Flat 10% off on HDFC Cards"
              />
            </label>
            <div className="rounded-lg border border-reliance-line bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-950">Audience Refinement</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Optional filters narrow the cohort after the trigger logic runs.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <SelectField label="Category" value={campaign.categoryFilter} options={[anyOption, ...categories]} onChange={(value) => updateCampaign("categoryFilter", value)} />
                <SelectField label="Brand Tier" value={campaign.brandFilter} options={[anyOption, ...brandTiers]} onChange={(value) => updateCampaign("brandFilter", value)} />
                <SelectField label="Buying Driver" value={campaign.driverFilter} options={[anyOption, ...buyingDrivers]} onChange={(value) => updateCampaign("driverFilter", value)} />
              </div>
            </div>
            <div className="grid gap-2 text-xs font-semibold text-slate-600 sm:grid-cols-2">
              <div className="rounded-lg bg-reliance-sky px-3 py-2 text-reliance-deep">Finance: card + EMI blockers</div>
              <div className="rounded-lg bg-reliance-sky px-3 py-2 text-reliance-deep">Inventory: stock replenished</div>
              <div className="rounded-lg bg-reliance-sky px-3 py-2 text-reliance-deep">Winback: competitor comparison</div>
              <div className="rounded-lg bg-reliance-sky px-3 py-2 text-reliance-deep">Intent: brand + premium signals</div>
            </div>
            <button
              type="button"
              onClick={runMatchingAlgorithm}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-reliance-blue px-4 text-sm font-bold text-white shadow-soft transition hover:bg-reliance-deep"
            >
              <BrainCircuit className="h-5 w-5" />
              Run Matching Algorithm
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-reliance-line bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-reliance-line p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-950">Target Cohort</h3>
              <p className="text-sm text-slate-500">
                {hasRunCampaign ? `${matches.length} matching customers found and ranked` : "Run the algorithm to generate matched customers."}
              </p>
            </div>
            <button
              type="button"
              disabled={!matches.length || bulkState.status === "sending"}
              onClick={sendAllMatches}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-bold text-white transition enabled:hover:bg-reliance-deep disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <Send className="h-4 w-4" />
              {bulkState.status === "sending" ? "Sending..." : "Send to All Matches"}
            </button>
            {bulkState.message && (
              <p className={`text-xs font-bold ${bulkState.status === "error" ? "text-rose-600" : "text-emerald-700"}`}>
                {bulkState.message}
              </p>
            )}
          </div>

          <div className="divide-y divide-slate-100">
            {!hasRunCampaign && (
              <EmptyState icon={Building2} title="Campaign brain is ready" text="Choose a trigger and campaign detail to create the first target cohort." />
            )}
            {hasRunCampaign && matches.length === 0 && (
              <EmptyState icon={BadgeIndianRupee} title="No exact matches" text="Try a broader trigger such as General Festival Offer, Urgency Recovery, or Competitor Winback." />
            )}
            {matches.map((customer) => (
              <div key={customer.id} className="p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-bold text-slate-950">{customer.name}</h4>
                      <span className="rounded-lg bg-reliance-sky px-2.5 py-1 text-xs font-bold text-reliance-deep">{customer.personaTag}</span>
                      <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{customer.matchScore}% fit</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{displayValue(customer.category)} - {displayValue(customer.walkoutReason)} - {displayValue(customer.financialHook)}</p>
                  </div>
                  <span className="inline-flex w-fit rounded-lg bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">{displayValue(customer.desiredBrand)}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {customer.matchReasons.map((reason) => (
                    <span key={reason} className="rounded-lg border border-reliance-line bg-white px-2.5 py-1 text-xs font-bold text-slate-600">
                      {reason}
                    </span>
                  ))}
                </div>
                <div className="mt-4 rounded-lg border border-reliance-line bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Auto-Drafted Personalized WhatsApp</p>
                    <button
                      type="button"
                      onClick={() => sendCampaignCustomer(customer)}
                      disabled={sendStates[customer.id]?.status === "sending"}
                      className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-reliance-blue px-3 text-xs font-bold text-white enabled:hover:bg-reliance-deep disabled:cursor-wait disabled:bg-slate-400"
                    >
                      <Send className="h-3.5 w-3.5" />
                      {sendStates[customer.id]?.status === "sending" ? "Sending" : "Send"}
                    </button>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{campaignMessage(customer, campaign.details, campaign.triggerType)}</p>
                  {sendStates[customer.id]?.message && (
                    <p className={`mt-3 rounded-lg px-3 py-2 text-xs font-bold ${
                      sendStates[customer.id]?.status === "error" ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"
                    }`}>
                      {sendStates[customer.id].message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function EmptyState({ icon: Icon, title, text }) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-reliance-sky text-reliance-blue">
        <Icon className="h-7 w-7" />
      </div>
      <h4 className="mt-4 text-lg font-bold text-slate-950">{title}</h4>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

export default App;
