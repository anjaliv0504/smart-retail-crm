import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  Crown,
  Flame,
  Gauge,
  Megaphone,
  MessageCircle,
  PackageCheck,
  PhoneCall,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Trophy,
  UsersRound,
  Zap
} from "lucide-react";
import {
  alerts,
  businessInsights,
  categoryPerformance,
  demandTrends,
  funnelData,
  heatmap,
  hourlyFootfall,
  inventoryProducts,
  retailCampaigns,
  staff
} from "./centralData";

const chartColors = ["#0057B8", "#00A3E0", "#0F766E", "#F59E0B", "#DC2626", "#64748B"];
const shadcnCard = "rounded-lg border border-reliance-line bg-white shadow-sm";

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return [value];
}

function displayValue(value, fallback = "Not captured") {
  const values = asArray(value).filter(Boolean);
  return values.length ? values.join(", ") : fallback;
}

function hasChoice(value, choice) {
  return asArray(value).includes(choice);
}

function rupees(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

function stockHealth(stock) {
  if (stock <= 0) return "Out of Stock";
  if (stock <= 5) return "Low Stock";
  return "Available";
}

function healthClass(health) {
  if (health === "Out of Stock") return "bg-rose-50 text-rose-700 border-rose-200";
  if (health === "Low Stock") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}

function confidenceClass(value) {
  if (value >= 88) return "text-emerald-700 bg-emerald-50";
  if (value >= 80) return "text-reliance-blue bg-reliance-sky";
  return "text-amber-700 bg-amber-50";
}

function categoryMatchScore(product, customer) {
  let score = 0;
  if (hasChoice(customer.category, product.category)) score += 48;
  if (hasChoice(customer.desiredBrand, product.brand)) score += 24;
  if (hasChoice(customer.walkoutReason, "Color Not Available") && product.colors.length > 1) score += 12;
  if (hasChoice(customer.walkoutReason, "Model Not Available") && product.variants.length > 1) score += 12;
  if (hasChoice(customer.brandTier, "Premium") && product.margin >= 24) score += 9;
  if (hasChoice(customer.buyingDriver, "Student") && product.category === "Laptop/IT") score += 9;
  if (hasChoice(customer.buyingDriver, "Gift Purchase") && ["Wearables", "Mobile"].includes(product.category)) score += 7;
  return Math.min(score, 96);
}

function findDemandMatches(products, customers) {
  return products
    .filter((product) => product.stock > 0)
    .flatMap((product) =>
      customers
        .map((customer) => ({
          customer,
          product,
          score: categoryMatchScore(product, customer)
        }))
        .filter((match) => match.score >= 46)
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, 9);
}

function filterInventory(products, search, brand, category) {
  const query = search.trim().toLowerCase();
  return products.filter((product) => {
    const matchesSearch = !query || `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(query);
    const matchesBrand = brand === "All" || product.brand === brand;
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesBrand && matchesCategory;
  });
}

function SkeletonStrip() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div key={item} className="h-16 animate-pulse rounded-lg bg-slate-100" />
      ))}
    </div>
  );
}

function Badge({ children, tone = "blue" }) {
  const tones = {
    blue: "bg-reliance-sky text-reliance-deep",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-rose-50 text-rose-700",
    slate: "bg-slate-100 text-slate-700"
  };
  return <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-bold ${tones[tone]}`}>{children}</span>;
}

function CommandCard({ title, value, note, icon: Icon, tone = "blue" }) {
  const toneClass = {
    blue: "bg-reliance-sky text-reliance-blue",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-rose-50 text-rose-700"
  }[tone];

  return (
    <motion.div whileHover={{ y: -3 }} className={`${shadcnCard} relative overflow-hidden p-4`}>
      <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,.12)]" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${toneClass}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
        <ArrowUpRight className="h-4 w-4" />
        {note}
      </p>
    </motion.div>
  );
}

function SectionCard({ title, subtitle, icon: Icon, children, action }) {
  return (
    <section className={`${shadcnCard} overflow-hidden`}>
      <div className="flex flex-col gap-3 border-b border-reliance-line bg-gradient-to-r from-white to-slate-50 p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-reliance-sky text-reliance-blue">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-950">{title}</h3>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function SelectBox({ value, onChange, options, label }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-10 w-full rounded-lg border border-reliance-line bg-white px-3 text-sm font-bold text-slate-700 outline-none focus:border-reliance-blue focus:ring-4 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function MiniButton({ children, onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 rounded-lg px-3 text-xs font-bold transition ${active ? "bg-reliance-blue text-white" : "bg-slate-100 text-slate-600 hover:bg-reliance-sky"}`}
    >
      {children}
    </button>
  );
}

function CentralManagement({ customers }) {
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [alertFilter, setAlertFilter] = useState("All");
  const [stockOverrides, setStockOverrides] = useState({});
  const [campaignStatus, setCampaignStatus] = useState(() =>
    Object.fromEntries(retailCampaigns.map((campaign) => [campaign.id, campaign.status]))
  );

  const inventory = useMemo(
    () => inventoryProducts.map((product) => ({ ...product, stock: stockOverrides[product.id] ?? product.stock })),
    [stockOverrides]
  );
  const filteredInventory = useMemo(
    () => filterInventory(inventory, search, brandFilter, categoryFilter),
    [inventory, search, brandFilter, categoryFilter]
  );
  const matches = useMemo(() => findDemandMatches(inventory, customers), [inventory, customers]);
  const brands = useMemo(() => ["All", ...new Set(inventory.map((item) => item.brand))], [inventory]);
  const productCategories = useMemo(() => ["All", ...new Set(inventory.map((item) => item.category))], [inventory]);
  const filteredAlerts = alertFilter === "All" ? alerts : alerts.filter((alert) => alert.type === alertFilter);
  const fastestCategory = categoryPerformance[0]?.name || "Mobile";
  const healthPercent = Math.round((inventory.filter((item) => item.stock > 5).length / inventory.length) * 100);
  const highIntentCount = customers.filter((customer) =>
    hasChoice(customer.walkoutReason, "Online Price Mismatch") || hasChoice(customer.brandTier, "Premium") || hasChoice(customer.techKnowledge, "Early Adopter")
  ).length;

  function adjustStock(product, stock) {
    setStockOverrides((current) => ({ ...current, [product.id]: Math.max(0, stock) }));
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="overflow-hidden rounded-lg border border-reliance-line bg-gradient-to-r from-reliance-deep via-reliance-blue to-sky-600 p-5 text-white shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
              <CircleDot className="h-3.5 w-3.5 animate-pulse text-emerald-300" />
              Live Store Command Center
            </div>
            <h2 className="mt-3 text-3xl font-bold">Central Management</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-50">
              Single-store intelligence layer for inventory, demand, campaigns, staff, footfall and conversion operations.
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-wide text-blue-100">Made By Anjali - Reliance Retail Intern</p>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-lg bg-white/10 p-3 text-center backdrop-blur">
            <div>
              <p className="text-xs text-blue-100">Sync</p>
              <p className="text-sm font-bold">Live</p>
            </div>
            <div>
              <p className="text-xs text-blue-100">Leads</p>
              <p className="text-sm font-bold">{customers.length}</p>
            </div>
            <div>
              <p className="text-xs text-blue-100">SKUs</p>
              <p className="text-sm font-bold">{inventory.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CommandCard title="Today's Revenue" value={rupees(1842000)} note="+18% vs last Monday" icon={TrendingUp} />
        <CommandCard title="Current Footfall" value="468" note="Peak after 6 PM" icon={UsersRound} tone="green" />
        <CommandCard title="Conversion Rate" value="24.8%" note="+3.4 pts today" icon={Gauge} tone="amber" />
        <CommandCard title="High Intent Customers" value={highIntentCount} note="Ready for retargeting" icon={Target} tone="green" />
        <CommandCard title="Fastest Selling Category" value={fastestCategory} note="Gaming gaining speed" icon={Flame} tone="red" />
        <CommandCard title="Inventory Health" value={`${healthPercent}%`} note="12 urgent stock actions" icon={PackageCheck} />
        <CommandCard title="Staff Performance Score" value="91/100" note="Top zone: Mobile" icon={Trophy} tone="green" />
        <div className={`${shadcnCard} bg-white/80 p-4 backdrop-blur`}>
          <p className="text-sm font-semibold text-slate-500">Live Activity</p>
          <div className="mt-4 space-y-3">
            {["New gaming lead matched", "Card offer pushed", "PS5 stock alert", "Exchange desk active"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionCard
        title="Smart Inventory Operations"
        subtitle="75-product simulated inventory with live demand matching"
        icon={ShoppingBag}
        action={
          <div className="grid gap-2 sm:grid-cols-3">
            <SelectBox label="Brand" value={brandFilter} onChange={setBrandFilter} options={brands} />
            <SelectBox label="Category" value={categoryFilter} onChange={setCategoryFilter} options={productCategories} />
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Search</span>
              <span className="mt-2 flex h-10 items-center gap-2 rounded-lg border border-reliance-line bg-white px-3">
                <Search className="h-4 w-4 text-reliance-blue" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} className="min-w-0 flex-1 border-0 text-sm font-semibold outline-none" placeholder="Product, brand" />
              </span>
            </label>
          </div>
        }
      >
        <div className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
          <div className="max-h-[520px] overflow-y-auto pr-1">
            <div className="grid gap-3 md:grid-cols-2">
              {filteredInventory.slice(0, 24).map((product) => {
                const health = stockHealth(product.stock);
                const waiting = matches.filter((match) => match.product.id === product.id).length;
                return (
                  <motion.div key={product.id} whileHover={{ y: -2 }} className="rounded-lg border border-reliance-line bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-slate-950">{product.name}</h4>
                        <p className="mt-1 text-sm text-slate-500">{product.brand} - {product.category}</p>
                      </div>
                      <span className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${healthClass(health)}`}>{health}</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600">
                      <span>Colors: {product.colors.join(", ")}</span>
                      <span>Variants: {product.variants.join(", ")}</span>
                      <span>Stock: {product.stock}</span>
                      <span>Demand: {product.demand}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <Badge tone={waiting ? "amber" : "slate"}>{waiting} waiting customers</Badge>
                      <div className="flex gap-2">
                        <MiniButton onClick={() => adjustStock(product, 0)}>OOS</MiniButton>
                        <MiniButton onClick={() => adjustStock(product, 4)}>Low</MiniButton>
                        <MiniButton onClick={() => adjustStock(product, product.stock + 10)}>Restock</MiniButton>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-2 text-amber-800">
                <AlertTriangle className="h-5 w-5" />
                <h4 className="font-bold">Stock Urgency Alerts</h4>
              </div>
              <div className="mt-3 space-y-2">
                {inventory.filter((item) => item.stock <= 5).slice(0, 6).map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm font-semibold">
                    <span>{item.name}</span>
                    <span className="text-rose-600">{item.stock} left</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-reliance-line bg-white p-4">
              <h4 className="font-bold text-slate-950">Fast Moving Products</h4>
              <div className="mt-3 space-y-3">
                {inventory.sort((a, b) => b.soldToday - a.soldToday).slice(0, 5).map((item) => (
                  <div key={item.id}>
                    <div className="mb-1 flex justify-between text-sm font-semibold">
                      <span>{item.name}</span>
                      <span>{item.soldToday} sold</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-reliance-blue" style={{ width: `${Math.min(100, item.soldToday * 7)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <SkeletonStrip />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Customer Demand Matching Engine" subtitle="Existing walkout insights matched to live stock" icon={Target}>
        <div className="grid gap-4 lg:grid-cols-3">
          {matches.map(({ customer, product, score }) => (
            <motion.div key={`${customer.id}-${product.id}`} whileHover={{ y: -3 }} className="rounded-lg border border-reliance-line bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-bold text-slate-950">{customer.name}</h4>
                  <p className="mt-1 text-sm text-slate-500">{displayValue(customer.category)} - {displayValue(customer.walkoutReason)}</p>
                </div>
                <Badge tone="green">{score}% likely</Badge>
              </div>
              <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                Match: {product.name}<br />
                Preferred color: {product.colors[0]}<br />
                Variant: {product.variants[0]}<br />
                Budget fit: {hasChoice(customer.brandTier, "Premium") ? "Premium ready" : "Mainstream fit"}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone="amber">High Intent Buyer</Badge>
                <Badge tone="blue">Urgency {Math.min(98, score + 4)}%</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-reliance-blue text-sm font-bold text-white">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Alert
                </button>
                <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-reliance-line text-sm font-bold text-slate-700">
                  <PhoneCall className="h-4 w-4" />
                  Call Reminder
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Retail Marketing Command Center" subtitle="Executable store campaigns for footfall and conversion" icon={Megaphone}>
        <div className="grid gap-4 xl:grid-cols-3">
          {retailCampaigns.map((campaign) => (
            <motion.div key={campaign.id} whileHover={{ y: -3 }} className="rounded-lg border border-reliance-line bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-bold text-slate-950">{campaign.name}</h4>
                  <p className="mt-1 text-sm leading-5 text-slate-500">{campaign.theme}</p>
                </div>
                <Badge tone={campaignStatus[campaign.id] === "Active" ? "green" : campaignStatus[campaign.id] === "Paused" ? "amber" : "blue"}>
                  {campaignStatus[campaign.id]}
                </Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-white p-3"><b>Footfall</b><br />+{campaign.expectedFootfall}%</div>
                <div className="rounded-lg bg-white p-3"><b>Conversion</b><br />+{campaign.expectedConversion}%</div>
                <div className="rounded-lg bg-white p-3"><b>Budget</b><br />{rupees(campaign.budget)}</div>
                <div className="rounded-lg bg-white p-3"><b>ROI</b><br />{campaign.roi}x</div>
              </div>
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-xs font-bold text-slate-500">
                  <span>{campaign.audience}</span>
                  <span>{campaign.progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-reliance-blue" style={{ width: `${campaign.progress}%` }} />
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-600">{campaign.timeline}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {campaign.products.slice(0, 3).map((product) => <Badge key={product} tone="slate">{product}</Badge>)}
              </div>
              <div className="mt-4 flex gap-2">
                <MiniButton active={campaignStatus[campaign.id] === "Active"} onClick={() => setCampaignStatus((current) => ({ ...current, [campaign.id]: "Active" }))}>Activate</MiniButton>
                <MiniButton active={campaignStatus[campaign.id] === "Paused"} onClick={() => setCampaignStatus((current) => ({ ...current, [campaign.id]: "Paused" }))}>Pause</MiniButton>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-5 rounded-lg border border-reliance-line bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-reliance-blue" />
            <h4 className="font-bold text-slate-950">Marketing Calendar View</h4>
          </div>
          <div className="grid gap-2 md:grid-cols-6">
            {retailCampaigns.map((campaign) => (
              <div key={campaign.id} className="rounded-lg bg-reliance-sky p-3 text-sm font-bold text-reliance-deep">{campaign.name}</div>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <SectionCard title="AI Business Insights Engine" subtitle="Generated operating recommendations for this store" icon={BrainCircuit}>
          <div className="grid gap-3 md:grid-cols-2">
            {businessInsights.map((insight) => (
              <div key={insight.title} className="rounded-lg border border-reliance-line bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-bold text-slate-950">{insight.title}</h4>
                  <span className={`rounded-lg px-2 py-1 text-xs font-bold ${confidenceClass(insight.confidence)}`}>{insight.confidence}%</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{insight.impact}</p>
                <p className="mt-3 rounded-lg bg-white p-3 text-sm font-semibold text-slate-700">{insight.action}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-reliance-blue" />
                  <Badge tone={insight.urgency === "High" ? "red" : insight.urgency === "Medium" ? "amber" : "green"}>{insight.urgency} urgency</Badge>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Real-Time Alert Center"
          subtitle="Inventory, demand, campaign and conversion notifications"
          icon={Bell}
          action={
            <div className="flex flex-wrap gap-2">
              {["All", "Inventory", "Demand", "Campaign", "Dead Stock", "Conversion"].map((item) => (
                <MiniButton key={item} active={alertFilter === item} onClick={() => setAlertFilter(item)}>{item}</MiniButton>
              ))}
            </div>
          }
        >
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className="flex gap-3 rounded-lg border border-reliance-line bg-slate-50 p-3">
                <span className={`mt-1 h-2.5 w-2.5 rounded-full ${alert.unread ? "bg-reliance-blue" : "bg-slate-300"}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-bold text-slate-950">{alert.message}</p>
                    <Badge tone={alert.priority === "High" ? "red" : alert.priority === "Medium" ? "amber" : "green"}>{alert.priority}</Badge>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{alert.type} - {alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Staff Performance Panel" subtitle="Leaderboard analytics with gamified sales coaching" icon={Crown}>
        <div className="grid gap-4 lg:grid-cols-5">
          {staff.map((member, index) => (
            <div key={member.name} className="rounded-lg border border-reliance-line bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-reliance-blue text-sm font-bold text-white">#{index + 1}</div>
                <Badge tone={index === 0 ? "amber" : "blue"}>{member.badge}</Badge>
              </div>
              <h4 className="mt-4 font-bold text-slate-950">{member.name}</h4>
              <p className="text-sm text-slate-500">{member.role}</p>
              {[
                ["Conversion", member.conversion],
                ["Attach", member.attachRate],
                ["CSAT", member.satisfaction],
                ["Score", member.score]
              ].map(([label, value]) => (
                <div key={label} className="mt-3">
                  <div className="mb-1 flex justify-between text-xs font-bold text-slate-500">
                    <span>{label}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white">
                    <div className="h-full rounded-full bg-reliance-blue" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
              <p className="mt-3 text-sm font-bold text-slate-700">{member.soldToday} products sold today</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Footfall + Store Analytics" subtitle="Premium analytics for demand, funnel and category performance" icon={Store}>
        <div className="grid gap-4 xl:grid-cols-2">
          <AnalyticsPanel title="Hourly Footfall">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={hourlyFootfall}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="footfall" stroke="#0057B8" fill="#DDEBFF" />
                <Line type="monotone" dataKey="conversion" stroke="#0F766E" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </AnalyticsPanel>
          <AnalyticsPanel title="Product Demand Trends">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={demandTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line dataKey="mobile" stroke="#0057B8" strokeWidth={2} />
                <Line dataKey="laptop" stroke="#00A3E0" strokeWidth={2} />
                <Line dataKey="gaming" stroke="#DC2626" strokeWidth={2} />
                <Line dataKey="appliances" stroke="#0F766E" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </AnalyticsPanel>
          <AnalyticsPanel title="Conversion Funnel">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={funnelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {funnelData.map((entry, index) => <Cell key={entry.name} fill={chartColors[index]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </AnalyticsPanel>
          <AnalyticsPanel title="Category Performance">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={categoryPerformance} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={4}>
                  {categoryPerformance.map((entry, index) => <Cell key={entry.name} fill={chartColors[index]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </AnalyticsPanel>
        </div>
        <div className="mt-4 rounded-lg border border-reliance-line bg-slate-50 p-4">
          <h4 className="font-bold text-slate-950">Customer Intent Heatmap</h4>
          <div className="mt-4 grid grid-cols-[70px_repeat(5,1fr)] gap-2 text-xs font-bold">
            <span />
            {["Mobile", "Laptop", "Gaming", "Home", "Wearables"].map((item) => <span key={item} className="text-slate-500">{item}</span>)}
            {heatmap.flatMap((row) => [
              <span key={`${row[0]}-label`} className="py-2 text-slate-500">{row[0]}</span>,
              ...row.slice(1).map((value, index) => (
                <span
                  key={`${row[0]}-${index}`}
                  className="rounded-lg py-2 text-center text-white"
                  style={{ backgroundColor: `rgba(0, 87, 184, ${Math.min(0.95, Number(value) / 70)})` }}
                >
                  {value}
                </span>
              ))
            ])}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function AnalyticsPanel({ title, children }) {
  return (
    <div className="rounded-lg border border-reliance-line bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-bold text-slate-950">{title}</h4>
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
      </div>
      {children}
    </div>
  );
}

export default CentralManagement;
