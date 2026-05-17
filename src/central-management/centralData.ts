export interface InventoryProduct {
  id: string;
  name: string;
  category: string;
  brand: string;
  colors: string[];
  variants: string[];
  stock: number;
  demand: "Low" | "Medium" | "High" | "Extreme";
  margin: number;
  soldToday: number;
}

export interface RetailCampaign {
  id: string;
  name: string;
  theme: string;
  expectedFootfall: number;
  expectedConversion: number;
  budget: number;
  status: "Active" | "Paused" | "Planned";
  roi: number;
  audience: string;
  products: string[];
  progress: number;
  timeline: string;
}

export interface BusinessInsight {
  title: string;
  confidence: number;
  impact: string;
  action: string;
  urgency: "Low" | "Medium" | "High";
}

export interface RetailAlert {
  id: string;
  type: "Inventory" | "Demand" | "Campaign" | "Dead Stock" | "Conversion";
  message: string;
  time: string;
  priority: "Low" | "Medium" | "High";
  unread: boolean;
}

export interface StaffMember {
  name: string;
  role: string;
  conversion: number;
  attachRate: number;
  satisfaction: number;
  soldToday: number;
  score: number;
  badge: string;
}

export interface ChartPoint {
  name: string;
  footfall?: number;
  conversion?: number;
  demand?: number;
  mobile?: number;
  laptop?: number;
  gaming?: number;
  appliances?: number;
  value?: number;
}

const productSeeds = [
  ["iPhone 15", "Mobile", "Apple", ["Black", "Blue", "Pink"], ["128GB", "256GB"], 18, "High", 24, 7],
  ["Galaxy S24", "Mobile", "Samsung", ["Black", "Violet", "Grey"], ["128GB", "256GB"], 22, "High", 22, 9],
  ["OnePlus 12R", "Mobile", "OnePlus", ["Blue", "Black"], ["128GB", "256GB"], 14, "High", 19, 8],
  ["Vivo V30", "Mobile", "Vivo", ["Green", "Black"], ["128GB", "256GB"], 9, "Medium", 17, 5],
  ["MacBook Air M3", "Laptop/IT", "Apple", ["Silver", "Midnight"], ["8GB/256GB", "16GB/512GB"], 8, "High", 28, 4],
  ["HP Pavilion 14", "Laptop/IT", "HP", ["Silver", "Blue"], ["i5/512GB", "i7/1TB"], 16, "Medium", 21, 5],
  ["Lenovo LOQ", "Gaming", "Lenovo", ["Storm Grey"], ["RTX 3050", "RTX 4060"], 6, "Extreme", 26, 6],
  ["Asus ROG Strix", "Gaming", "Asus", ["Black"], ["RTX 4060", "RTX 4070"], 5, "Extreme", 30, 4],
  ["PS5 Slim", "Gaming", "Sony", ["White"], ["Disc", "Digital"], 3, "Extreme", 23, 5],
  ["Apple Watch Series 9", "Wearables", "Apple", ["Midnight", "Starlight"], ["GPS", "GPS Cellular"], 11, "High", 18, 4],
  ["Galaxy Watch 6", "Wearables", "Samsung", ["Graphite", "Silver"], ["40mm", "44mm"], 12, "Medium", 17, 3],
  ["LG InstaView Refrigerator", "Home Appliances", "LG", ["Steel", "Black"], ["650L", "700L"], 4, "Medium", 24, 2],
  ["Samsung Bespoke AC", "Home Appliances", "Samsung", ["White"], ["1.5 Ton", "2 Ton"], 7, "High", 20, 4],
  ["Dyson V12", "Home Appliances", "Dyson", ["Gold", "Nickel"], ["Standard"], 2, "High", 32, 3],
  ["Meta Quest 3", "New Age Gadgets", "Meta", ["White"], ["128GB", "512GB"], 4, "High", 27, 2]
] as const;

export const inventoryProducts: InventoryProduct[] = Array.from({ length: 75 }, (_, index) => {
  const seed = productSeeds[index % productSeeds.length];
  const cycle = Math.floor(index / productSeeds.length) + 1;
  const stockBase = Number(seed[6]);
  return {
    id: `sku-${index + 1}`,
    name: cycle === 1 ? seed[0] : `${seed[0]} Store Pack ${cycle}`,
    category: seed[1],
    brand: seed[2],
    colors: [...seed[3]],
    variants: [...seed[4]],
    stock: Math.max(0, stockBase - (index % 6)),
    demand: seed[7],
    margin: Number(seed[8]),
    soldToday: Number(seed[9]) + (index % 4)
  };
});

export const retailCampaigns: RetailCampaign[] = [
  {
    id: "gaming-arena",
    name: "Gaming Arena Weekend",
    theme: "PS5 demo zone, gaming tournaments, RGB showcase setup",
    expectedFootfall: 34,
    expectedConversion: 16,
    budget: 55000,
    status: "Active",
    roi: 3.8,
    audience: "Gamers, students, creators",
    products: ["PS5 Slim", "Asus ROG Strix", "Lenovo LOQ", "Gaming accessories"],
    progress: 72,
    timeline: "Fri setup, Sat tournament, Sun bundle push"
  },
  {
    id: "student-laptop",
    name: "Student Laptop Festival",
    theme: "College ID discounts, EMI offers, creator bundles",
    expectedFootfall: 28,
    expectedConversion: 19,
    budget: 42000,
    status: "Active",
    roi: 4.4,
    audience: "Students and parents",
    products: ["HP Pavilion 14", "MacBook Air M3", "Lenovo LOQ", "Creator bundles"],
    progress: 64,
    timeline: "Mon campus push, Wed EMI desk, Weekend closures"
  },
  {
    id: "smart-home",
    name: "Smart Home Experience Zone",
    theme: "Live smart home setup demo",
    expectedFootfall: 22,
    expectedConversion: 13,
    budget: 38000,
    status: "Planned",
    roi: 3.1,
    audience: "Families and homeowners",
    products: ["Samsung Bespoke AC", "LG InstaView Refrigerator", "Smart speakers"],
    progress: 38,
    timeline: "Demo wall setup, staff pitch cards, family walkthroughs"
  },
  {
    id: "exchange-carnival",
    name: "Exchange Carnival",
    theme: "Upgrade old gadgets instantly",
    expectedFootfall: 31,
    expectedConversion: 18,
    budget: 47000,
    status: "Active",
    roi: 4.1,
    audience: "Upgrade seekers and deal hunters",
    products: ["iPhone 15", "Galaxy S24", "OnePlus 12R", "Exchange counter"],
    progress: 81,
    timeline: "Daily exchange desk, weekend upgrade blitz"
  },
  {
    id: "creator-studio",
    name: "Creator Studio Week",
    theme: "Cameras, mic and lighting setups",
    expectedFootfall: 18,
    expectedConversion: 11,
    budget: 36000,
    status: "Paused",
    roi: 2.7,
    audience: "Creators, vloggers, students",
    products: ["MacBook Air M3", "Meta Quest 3", "Creator audio kits"],
    progress: 44,
    timeline: "Influencer demo, creator kit table, add-on close"
  },
  {
    id: "night-owl",
    name: "Night Owl Flash Sale",
    theme: "Late-night in-store offers",
    expectedFootfall: 25,
    expectedConversion: 14,
    budget: 30000,
    status: "Planned",
    roi: 3.5,
    audience: "After-office shoppers",
    products: ["Wearables", "Mobile accessories", "Headphones", "Fast chargers"],
    progress: 29,
    timeline: "6 PM start, hourly announcement, 9 PM close push"
  }
];

export const businessInsights: BusinessInsight[] = [
  { title: "Gaming accessories demand rising rapidly", confidence: 91, impact: "High margin attach opportunity", action: "Move controllers and RGB kits beside gaming laptops", urgency: "High" },
  { title: "Most customers visiting after 6PM", confidence: 88, impact: "Peak staffing window shifted", action: "Add one senior closer from 6 PM to 9 PM", urgency: "High" },
  { title: "High-end headphones generating highest margins", confidence: 84, impact: "Premium audio margin expansion", action: "Bundle ANC headphones with phones and laptops", urgency: "Medium" },
  { title: "Customers asking for viral online gadgets", confidence: 79, impact: "New Age Gadgets traffic signal", action: "Create a trending gadgets bay near entrance", urgency: "Medium" },
  { title: "Accessory attachment rate increased this weekend", confidence: 86, impact: "Higher basket value", action: "Repeat bundle script for every laptop sale", urgency: "Low" },
  { title: "Students showing high interest in creator products", confidence: 82, impact: "Creator bundle conversion potential", action: "Run student creator bundle demo at 5 PM", urgency: "Medium" }
];

export const alerts: RetailAlert[] = [
  { id: "a1", type: "Inventory", message: "PS5 Slim stock below tournament demand", time: "2 min ago", priority: "High", unread: true },
  { id: "a2", type: "Demand", message: "Four customers waiting for iPhone blue 256GB", time: "9 min ago", priority: "High", unread: true },
  { id: "a3", type: "Campaign", message: "Exchange Carnival conversion is 12% above plan", time: "18 min ago", priority: "Medium", unread: true },
  { id: "a4", type: "Dead Stock", message: "Two slow-moving AC variants need bundle push", time: "34 min ago", priority: "Medium", unread: false },
  { id: "a5", type: "Conversion", message: "Laptop zone conversion dipped after 7 PM", time: "48 min ago", priority: "High", unread: false },
  { id: "a6", type: "Inventory", message: "Dyson V12 has only two units left", time: "1 hr ago", priority: "Medium", unread: false }
];

export const staff: StaffMember[] = [
  { name: "Rohit Sharma", role: "Mobile Lead", conversion: 38, attachRate: 42, satisfaction: 96, soldToday: 18, score: 94, badge: "Closer" },
  { name: "Anjali Verma", role: "Laptop Specialist", conversion: 34, attachRate: 48, satisfaction: 98, soldToday: 14, score: 92, badge: "Bundle Pro" },
  { name: "Meera Nair", role: "Appliances Advisor", conversion: 31, attachRate: 36, satisfaction: 95, soldToday: 11, score: 87, badge: "Service Star" },
  { name: "Kabir Khan", role: "Gaming Zone", conversion: 29, attachRate: 51, satisfaction: 93, soldToday: 12, score: 86, badge: "Arena Champ" },
  { name: "Priya Sethi", role: "Wearables Desk", conversion: 27, attachRate: 44, satisfaction: 94, soldToday: 10, score: 82, badge: "Fast Assist" }
];

export const hourlyFootfall: ChartPoint[] = [
  { name: "10", footfall: 18, conversion: 14 },
  { name: "11", footfall: 24, conversion: 16 },
  { name: "12", footfall: 31, conversion: 18 },
  { name: "13", footfall: 28, conversion: 15 },
  { name: "14", footfall: 34, conversion: 19 },
  { name: "15", footfall: 42, conversion: 21 },
  { name: "16", footfall: 48, conversion: 23 },
  { name: "17", footfall: 53, conversion: 25 },
  { name: "18", footfall: 71, conversion: 29 },
  { name: "19", footfall: 82, conversion: 31 },
  { name: "20", footfall: 76, conversion: 28 },
  { name: "21", footfall: 49, conversion: 22 }
];

export const demandTrends: ChartPoint[] = [
  { name: "Mon", mobile: 42, laptop: 34, gaming: 21, appliances: 28 },
  { name: "Tue", mobile: 46, laptop: 38, gaming: 24, appliances: 31 },
  { name: "Wed", mobile: 51, laptop: 41, gaming: 29, appliances: 33 },
  { name: "Thu", mobile: 49, laptop: 47, gaming: 32, appliances: 30 },
  { name: "Fri", mobile: 58, laptop: 53, gaming: 44, appliances: 36 },
  { name: "Sat", mobile: 75, laptop: 61, gaming: 69, appliances: 48 },
  { name: "Sun", mobile: 68, laptop: 57, gaming: 63, appliances: 45 }
];

export const funnelData: ChartPoint[] = [
  { name: "Footfall", value: 468 },
  { name: "Engaged", value: 312 },
  { name: "Quoted", value: 184 },
  { name: "Closed", value: 79 }
];

export const categoryPerformance: ChartPoint[] = [
  { name: "Mobile", value: 31 },
  { name: "Laptop", value: 26 },
  { name: "Gaming", value: 18 },
  { name: "Appliances", value: 15 },
  { name: "Wearables", value: 10 }
];

export const heatmap = [
  ["10 AM", 12, 18, 22, 16, 11],
  ["12 PM", 20, 26, 24, 21, 17],
  ["2 PM", 24, 31, 28, 25, 18],
  ["4 PM", 33, 39, 42, 30, 24],
  ["6 PM", 48, 52, 61, 41, 34],
  ["8 PM", 42, 49, 55, 36, 29]
];
