const seedRows = [
  ["Sachin Saxena", "7838764065", "Delhi 110092", "Laptop/IT", "Individual", "Tech-Savvy", "Sole Decision", "Mainstream", "Just Browsing", "Croma/Vijay Sales", "Under 2%", "No-Cost EMI", "This Week", 4],
  ["Ayush Badoni", "9761328965", "Noida 201301", "Laptop/IT", "Individual", "Needs Guidance", "Sole Decision", "Mainstream", "Just Browsing", "Amazon/Flipkart", "2% to 5%", "Credit Card Discount", "This Week", 4],
  ["Anushree Sarkar", "8448862125", "Gurugram 122001", "Laptop/IT", "Individual", "Tech-Savvy", "Sole Decision", "Premium", "Just Browsing", "Amazon/Flipkart", "Under 2%", "Extended Warranty", "Next Week/Month", 4],
  ["Gaurav Trivedi", "9711304158", "", "Laptop/IT", "Individual", "Needs Guidance", "Influencer Present", "Budget", "Online Price Mismatch", "Local Dealer", "Above 5%", "No-Cost EMI", "Window Shopping", 4],
  ["Riyaz Khan", "8802134987", "Delhi 110025", "Laptop/IT", "Individual", "Tech-Savvy", "Sole Decision", "Premium", "Just Browsing", "Amazon/Flipkart", "Under 2%", "Extended Warranty", "Today/Immediate", 4],
  ["Mayank Gupta", "7259158886", "Ghaziabad 201001", "Laptop/IT", "Individual", "Tech-Savvy", "Sole Decision", "Mainstream", "Just Browsing", "Croma/Vijay Sales", "2% to 5%", "Credit Card Discount", "This Week", 4],
  ["Amit Rajput", "8200086679", "Delhi 110018", "Laptop/IT", "Individual", "Needs Guidance", "Needs Approval", "Budget", "Finance/Card Issue", "Local Dealer", "Above 5%", "No-Cost EMI", "This Week", 4],
  ["Harish Bansal", "9810123218", "", "Laptop/IT", "Individual", "Tech-Savvy", "Sole Decision", "Mainstream", "Just Browsing", "Amazon/Flipkart", "Under 2%", "Credit Card Discount", "Next Week/Month", 4],
  ["H.G", "8520873263", "Delhi 110058", "Laptop/IT", "Corporate", "Tech-Savvy", "Corporate Approval", "Premium", "Just Browsing", "Croma/Vijay Sales", "Under 2%", "Extended Warranty", "Today/Immediate", 4],
  ["Md Middassar Ansari", "9910746247", "Noida 201309", "Laptop/IT", "Individual", "Needs Guidance", "Influencer Present", "Budget", "Color/Model Out of Stock", "Local Dealer", "Above 5%", "No-Cost EMI", "This Week", 4],
  ["Krishna Krish", "7895308454", "Delhi 110096", "Laptop/IT", "Individual", "Tech-Savvy", "Sole Decision", "Mainstream", "Just Browsing", "Amazon/Flipkart", "2% to 5%", "Credit Card Discount", "Next Week/Month", 4],
  ["Rahul Gupta", "9680204776", "", "Laptop/IT", "Individual", "Needs Guidance", "Needs Approval", "Mainstream", "Just Browsing", "Amazon/Flipkart", "2% to 5%", "No-Cost EMI", "This Week", 4],
  ["Vinay Vishwakarma", "8800449495", "Faridabad 121001", "Laptop/IT", "Individual", "Tech-Savvy", "Sole Decision", "Premium", "Just Browsing", "Amazon/Flipkart", "Under 2%", "Extended Warranty", "Next Week/Month", 4],
  ["Umesh Chandra", "6393226311", "Delhi 110001", "Laptop/IT", "Individual", "Tech-Savvy", "Sole Decision", "Premium", "Brand Preference", "Apple Store", "Not a price issue", "Extended Warranty", "Next Week/Month", 4],
  ["Sheeba Khan", "9351439782", "Delhi 110044", "Laptop/IT", "Individual", "Needs Guidance", "Influencer Present", "Mainstream", "Just Browsing", "Amazon/Flipkart", "2% to 5%", "No-Cost EMI", "Today/Immediate", 3],
  ["Arjun Mehta", "9884063001", "Delhi 110019", "Laptop/IT", "Individual", "Tech-Savvy", "Sole Decision", "Mainstream", "Just Browsing", "Amazon/Flipkart", "Under 2%", "Credit Card Discount", "This Week", 3],
  ["Nitesh", "9657121851", "", "Laptop/IT", "Individual", "Needs Guidance", "Needs Approval", "Mainstream", "Just Browsing", "Croma/Vijay Sales", "2% to 5%", "No-Cost EMI", "This Week", 3],
  ["A.J", "8210233649", "Delhi 110059", "Laptop/IT", "Individual", "Tech-Savvy", "Sole Decision", "Premium", "Brand Preference", "Apple Store", "Not a price issue", "Extended Warranty", "Next Week/Month", 3],
  ["Bhavesh Kukreja", "9628658896", "Gurugram 122002", "Laptop/IT", "Individual", "Tech-Savvy", "Sole Decision", "Mainstream", "Just Browsing", "Amazon/Flipkart", "Under 2%", "Credit Card Discount", "This Week", 3],
  ["Gurmeet Singh", "7082167238", "Delhi 110075", "Gaming", "Individual", "Tech-Savvy", "Sole Decision", "Premium", "Just Browsing", "Amazon/Flipkart", "2% to 5%", "No-Cost EMI", "This Week", 3],
  ["Arun Kumar", "8010286955", "Noida 201304", "Laptop/IT", "Individual", "Needs Guidance", "Needs Approval", "Mainstream", "Just Browsing", "Local Dealer", "Above 5%", "No-Cost EMI", "Next Week/Month", 3],
  ["Ashik Kumar", "9456636513", "Delhi 110032", "Laptop/IT", "Individual", "Tech-Savvy", "Sole Decision", "Premium", "Brand Preference", "Apple Store", "Not a price issue", "Extended Warranty", "This Week", 3],
  ["Rahul Kaur", "8445895666", "", "Laptop/IT", "Individual", "Needs Guidance", "Influencer Present", "Mainstream", "Just Browsing", "Amazon/Flipkart", "2% to 5%", "No-Cost EMI", "Next Week/Month", 3],
  ["Amoto", "9523935412", "Delhi 110027", "Laptop/IT", "Individual", "Needs Guidance", "Needs Approval", "Mainstream", "Exchange Concern", "Croma/Vijay Sales", "2% to 5%", "Exchange Bonus", "Today/Immediate", 3],
  ["Vikas Pandey", "9970165324", "Faridabad 121003", "Laptop/IT", "Individual", "Needs Guidance", "Influencer Present", "Budget", "Online Price Mismatch", "Local Dealer", "Above 5%", "No-Cost EMI", "Window Shopping", 3],
  ["Shivam Puri", "9820247130", "Delhi 110085", "Laptop/IT", "Individual", "Tech-Savvy", "Sole Decision", "Mainstream", "Just Browsing", "Amazon/Flipkart", "Under 2%", "Credit Card Discount", "This Week", 3],
  ["Hari Shankar", "9313725498", "Ghaziabad 201002", "Laptop/IT", "Individual", "Needs Guidance", "Needs Approval", "Budget", "Budget Constraint", "Local Dealer", "Above 5%", "Exchange Bonus", "Next Week/Month", 3],
  ["Utsav Malhotra", "7042508887", "", "Laptop/IT", "Individual", "Tech-Savvy", "Sole Decision", "Mainstream", "Just Browsing", "Amazon/Flipkart", "Under 2%", "Credit Card Discount", "Today/Immediate", 3],
  ["Riya Sharma", "9600000001", "Delhi 110017", "Mobile", "Family", "Needs Guidance", "Influencer Present", "Mainstream", "Online Price Mismatch", "Amazon/Flipkart", "2% to 5%", "Credit Card Discount", "This Week", 2],
  ["Dev Patel", "9600000002", "Noida 201301", "TV/Audio", "Family", "Status-Driven", "Needs Approval", "Premium", "Color/Model Out of Stock", "Croma/Vijay Sales", "Under 2%", "Exchange Bonus", "Next Week/Month", 2],
  ["Nisha Gupta", "9600000003", "Delhi 110064", "Home Appliances", "Family", "Needs Guidance", "", "Mainstream", "Finance/Card Issue", "Local Dealer", "Not a price issue", "No-Cost EMI", "This Week", 2],
  ["Karan Malhotra", "9600000004", "Gurugram 122018", "Gaming", "Individual", "Tech-Savvy", "Sole Decision", "Premium", "Online Price Mismatch", "Amazon/Flipkart", "Above 5%", "Credit Card Discount", "Today/Immediate", 2],
  ["Anaya Das", "9600000005", "", "Mobile", "Individual", "Tech-Savvy", "Sole Decision", "Premium", "Brand Preference", "Apple Store", "Not a price issue", "Extended Warranty", "Next Week/Month", 2],
  ["Rohan Verma", "9600000006", "Delhi 110034", "Home Appliances", "Family", "Needs Guidance", "Needs Approval", "Budget", "Just Browsing", "No comparison", "", "Exchange Bonus", "", 2],
  ["Ishita Sen", "9600000007", "Noida 201307", "TV/Audio", "Family", "Needs Guidance", "Influencer Present", "Mainstream", "Just Browsing", "Amazon/Flipkart", "Under 2%", "", "Window Shopping", 2],
  ["Yash Bansal", "9600000008", "Delhi 110063", "Gaming", "Individual", "Tech-Savvy", "Sole Decision", "Mainstream", "Finance/Card Issue", "Amazon/Flipkart", "2% to 5%", "No-Cost EMI", "This Week", 2],
  ["Tara Joshi", "9600000009", "Faridabad 121005", "Mobile", "Deal-Hunter", "Early Adopter", "", "Budget", "Online Price Mismatch", "Local Dealer", "Above 5%", "Exchange Bonus", "Today/Immediate", 2],
  ["Aditya Menon", "9600000010", "Delhi 110048", "Home Appliances", "Corporate", "Needs Guidance", "Corporate Approval", "Premium", "Finance/Card Issue", "Croma/Vijay Sales", "Not a price issue", "No-Cost EMI", "This Week", 2],
  ["Kiara Shah", "9600000011", "Delhi 110003", "TV/Audio", "Family", "Status-Driven", "Needs Approval", "Premium", "Brand Preference", "No comparison", "Not a price issue", "Extended Warranty", "Next Week/Month", 2],
  ["Nikhil Jain", "9600000012", "", "Smartwatch/Wearables", "Individual", "Tech-Savvy", "Sole Decision", "Mainstream", "Just Browsing", "Amazon/Flipkart", "Under 2%", "Credit Card Discount", "This Week", 2],
  ["Pooja Sinha", "9600000013", "Ghaziabad 201010", "Home Appliances", "Family", "", "Needs Approval", "Mainstream", "Color/Model Out of Stock", "Local Dealer", "Under 2%", "", "Next Week/Month", 1],
  ["Harsh Agarwal", "9600000014", "Delhi 110020", "Gaming", "Individual", "Tech-Savvy", "Sole Decision", "Premium", "Just Browsing", "Amazon/Flipkart", "2% to 5%", "Credit Card Discount", "Today/Immediate", 1],
  ["Simran Kaur", "9600000015", "Delhi 110026", "Mobile", "Family", "Needs Guidance", "Influencer Present", "Mainstream", "Finance/Card Issue", "Croma/Vijay Sales", "Not a price issue", "No-Cost EMI", "This Week", 1],
  ["Rahul Chawla", "9600000016", "Noida 201305", "TV/Audio", "Deal-Hunter", "Tech-Savvy", "Sole Decision", "Budget", "Online Price Mismatch", "Amazon/Flipkart", "Above 5%", "Credit Card Discount", "Today/Immediate", 1],
  ["Neha Reddy", "9600000017", "", "Home Appliances", "Family", "Needs Guidance", "", "Premium", "Exchange Concern", "Croma/Vijay Sales", "2% to 5%", "Exchange Bonus", "Next Week/Month", 1],
  ["Manav Bhatia", "9600000018", "Delhi 110022", "Gaming", "Individual", "Tech-Savvy", "Sole Decision", "Mainstream", "Color/Model Out of Stock", "Amazon/Flipkart", "Under 2%", "No-Cost EMI", "This Week", 1],
  ["Aisha Mirza", "9600000019", "Gurugram 122011", "Smartwatch/Wearables", "Individual", "Status-Driven", "Sole Decision", "Premium", "Just Browsing", "No comparison", "", "Extended Warranty", "", 1],
  ["Varun Saxena", "9600000020", "Delhi 110029", "Home Appliances", "Family", "Needs Guidance", "Needs Approval", "Budget", "Budget Constraint", "Local Dealer", "Above 5%", "Exchange Bonus", "Window Shopping", 1],
  ["Dia Chatterjee", "9600000021", "Delhi 110016", "TV/Audio", "Family", "Needs Guidance", "Influencer Present", "Mainstream", "Finance/Card Issue", "Croma/Vijay Sales", "Not a price issue", "No-Cost EMI", "This Week", 1],
  ["Om Prakash", "9600000022", "Noida 201306", "Mobile", "Deal-Hunter", "Early Adopter", "Sole Decision", "Budget", "Online Price Mismatch", "Amazon/Flipkart", "2% to 5%", "Credit Card Discount", "Today/Immediate", 1],
  ["Tanvi Arora", "9600000023", "", "Gaming", "Individual", "Needs Guidance", "Influencer Present", "Budget", "Just Browsing", "Local Dealer", "", "", "Next Week/Month", 1],
  ["Sahil Grover", "9600000024", "Faridabad 121002", "TV/Audio", "Corporate", "Tech-Savvy", "Corporate Approval", "Premium", "Brand Preference", "No comparison", "Not a price issue", "Extended Warranty", "Next Week/Month", 1],
  ["Lavanya Pillai", "9600000025", "Delhi 110070", "Home Appliances", "Family", "Needs Guidance", "Needs Approval", "Mainstream", "Color/Model Out of Stock", "Croma/Vijay Sales", "Under 2%", "No-Cost EMI", "This Week", 1],
  ["Akash Suri", "9600000026", "Delhi 110077", "Smartwatch/Wearables", "Individual", "Tech-Savvy", "Sole Decision", "Mainstream", "Just Browsing", "Amazon/Flipkart", "Under 2%", "Credit Card Discount", "This Week", 1],
  ["Maya Thomas", "9600000027", "Gurugram 122009", "Gaming", "Individual", "Tech-Savvy", "Sole Decision", "Premium", "Online Price Mismatch", "Amazon/Flipkart", "Above 5%", "No-Cost EMI", "Today/Immediate", 1],
  ["Rudra Vyas", "9600000028", "", "Home Appliances", "Family", "", "", "Undecided", "Just Browsing", "No comparison", "Not a price issue", "", "Window Shopping", 1],
  ["Anika Bose", "9600000029", "Delhi 110052", "TV/Audio", "Family", "Needs Guidance", "Influencer Present", "Mainstream", "Online Price Mismatch", "Amazon/Flipkart", "2% to 5%", "Credit Card Discount", "This Week", 1],
  ["Jay Mehta", "9600000030", "Noida 201308", "Mobile", "Corporate", "Tech-Savvy", "Corporate Approval", "Premium", "Finance/Card Issue", "Croma/Vijay Sales", "Not a price issue", "No-Cost EMI", "Today/Immediate", 1]
];

function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function valueFor(category, tier) {
  const values = {
    Mobile: { Budget: 18000, Mainstream: 30000, Premium: 45000, Undecided: 28000 },
    "Smartwatch/Wearables": { Budget: 5000, Mainstream: 12000, Premium: 30000, Undecided: 10000 },
    "Laptop/IT": { Budget: 32000, Mainstream: 55000, Premium: 85000, Undecided: 52000 },
    "TV/Audio": { Budget: 22000, Mainstream: 48000, Premium: 85000, Undecided: 45000 },
    "Home Appliances": { Budget: 18000, Mainstream: 42000, Premium: 90000, Undecided: 38000 },
    Gaming: { Budget: 45000, Mainstream: 85000, Premium: 140000, Undecided: 75000 }
  };
  return values[category]?.[tier] || values.Mobile.Mainstream;
}

function personaFor(row) {
  const [, , , category, driver, knowledge, , tier, reason] = row;
  if (category === "Gaming") return "Gaming Seeker";
  if (driver === "Corporate") return "Corporate Buyer";
  if (knowledge === "Needs Guidance") return "Guided Shopper";
  if (tier === "Premium") return "Premium Seeker";
  if (reason === "Online Price Mismatch" || reason === "Price Sensitive") return "Price Watcher";
  return `${tier || "Retail"} ${driver || "Buyer"}`;
}

function normalizeReason(reason, index) {
  if (reason === "Finance/Card Issue") return index % 2 ? "Card Issue" : "Finance Issue";
  if (reason === "Color/Model Out of Stock" || reason === "Stock Issue") return index % 2 ? "Color Not Available" : "Model Not Available";
  if (reason === "Price Sensitive") return "Online Price Mismatch";
  return reason;
}

function desiredBrandFor(row) {
  const category = row[3];
  const competitor = row[9];
  if (competitor === "Apple Store") return "Apple";
  if (competitor.includes("Samsung")) return "Samsung";
  if (category === "Gaming") return "Asus";
  if (category === "TV/Audio") return "Sony";
  if (category === "Home Appliances") return "LG";
  if (category === "Laptop/IT" && row[7] === "Premium") return "Apple";
  if (category === "Laptop/IT") return "HP";
  return "Undecided";
}

function storeSourceFor(index) {
  return ["Walk-in", "Google Search", "Mall/Store Signage", "Friend/Family Referral"][index % 4];
}

function labelForDay(days) {
  return { 4: "Monday", 3: "Tuesday", 2: "Wednesday", 1: "Thursday" }[days] || `${days} days ago`;
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
  desiredBrand: index % 6 === 0 ? "" : desiredBrandFor(row),
  walkoutReason: normalizeReason(row[8], index),
  competitor: row[9],
  priceGap: row[10],
  financialHook: row[11],
  storeSource: storeSourceFor(index),
  requirement: index % 7 === 0 ? "" : `${row[3]} enquiry`,
  priceMismatchRange: "",
  personaTag: personaFor(row),
  estimatedValue: valueFor(row[3], row[7]),
  createdAtIso: daysAgo(row[13]),
  createdAt: labelForDay(row[13])
}));
