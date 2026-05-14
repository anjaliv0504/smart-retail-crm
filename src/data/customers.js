const seedRows = [
  ["Aarav Mehta", "9876543210", "Mumbai 400053", "Mobile/Smartwatch", "Deal-Hunter", "Tech-Savvy", "Sole Decision", "Premium", "Online Price Mismatch", "Amazon/Flipkart", "2% to 5%", "Credit Card Discount", "Today/Immediate", "Urgent Deal-Hunter", 84000, 0],
  ["Priya Nair", "9988776655", "Thane 400601", "Home Appliances", "Family", "Needs Guidance", "Needs Approval", "Mainstream", "Finance/Card Issue", "Croma/Vijay Sales", "Not a price issue", "No-Cost EMI", "This Week", "Family Planner", 52000, 1],
  ["Kabir Singh", "9123456789", "Pune 411001", "TV/Audio", "Corporate", "Status-Driven", "Corporate Approval", "Premium", "Color/Model Out of Stock", "Local Dealer", "Under 2%", "Exchange Bonus", "Next Week/Month", "Corporate Premium", 118000, 3],
  ["Riya Sharma", "9600000001", "Delhi 110001", "Laptop/IT", "Individual", "Tech-Savvy", "Sole Decision", "Mainstream", "Online Price Mismatch", "Amazon/Flipkart", "Above 5%", "Credit Card Discount", "Today/Immediate", "Urgent Individual", 78000, 6],
  ["Vivaan Rao", "9600000002", "Bengaluru 560001", "Mobile/Smartwatch", "Deal-Hunter", "Aggressive Negotiator", "Influencer Present", "Budget", "Finance/Card Issue", "Croma/Vijay Sales", "2% to 5%", "No-Cost EMI", "This Week", "Budget Deal-Hunter", 39600, 8],
  ["Meera Iyer", "9600000003", "Chennai 600017", "TV/Audio", "Family", "Needs Guidance", "Needs Approval", "Mainstream", "Just Browsing", "No comparison", "Not a price issue", "Exchange Bonus", "Window Shopping", "Guided Shopper", 90000, 12],
  ["Arjun Kapoor", "9600000004", "Jaipur 302001", "Home Appliances", "Corporate", "Status-Driven", "Corporate Approval", "Premium", "Color/Model Out of Stock", "Local Dealer", "Under 2%", "Upfront Cash", "Next Week/Month", "Corporate Buyer", 83700, 16],
  ["Sana Khan", "9600000005", "Hyderabad 500001", "Mobile/Smartwatch", "Individual", "Needs Guidance", "Sole Decision", "Undecided", "Online Price Mismatch", "Amazon/Flipkart", "2% to 5%", "Credit Card Discount", "This Week", "Price Watcher", 49500, 22],
  ["Dev Patel", "9600000006", "Ahmedabad 380001", "Laptop/IT", "Deal-Hunter", "Tech-Savvy", "Sole Decision", "Premium", "Finance/Card Issue", "Croma/Vijay Sales", "Above 5%", "No-Cost EMI", "Today/Immediate", "Urgent Deal-Hunter", 105300, 28],
  ["Nisha Gupta", "9600000007", "Kolkata 700001", "Home Appliances", "Family", "Needs Guidance", "Needs Approval", "Budget", "Just Browsing", "No comparison", "Not a price issue", "Exchange Bonus", "Next Week/Month", "Guided Shopper", 44640, 35]
];

function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

export const initialCustomers = seedRows.map((row, index) => ({
  id: index + 1,
  name: row[0],
  phone: row[1],
  location: row[2],
  category: row[3],
  buyingDriver: row[4],
  techKnowledge: row[5],
  decisionMaker: row[6],
  brandTier: row[7],
  walkoutReason: row[8],
  competitor: row[9],
  priceGap: row[10],
  financialHook: row[11],
  urgency: row[12],
  personaTag: row[13],
  estimatedValue: row[14],
  createdAtIso: daysAgo(row[15]),
  createdAt: row[15] === 0 ? "Today" : `${row[15]} days ago`
}));
