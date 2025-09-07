const fs = require("fs");

const filePath = "./script.json";

function readData() {
  const catagories = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(catagories);
}

function writeData(catagories) {
  fs.writeFileSync(filePath, JSON.stringify(catagories, null, 2));
}

function addExpenses(food, travel, bills) {
  const Expenses = readData();
  const newExpenses = { id: Expenses.length + 1, food, travel, bills };

  Expenses.push(newExpenses);
  writeData(Expenses);

  console.log("✅ Expenses Added:", newExpenses);
}

function viewExpenses() {
  const Expenses = readData();
  console.log("📒 All Users:", Expenses);
}

// --- Example Run ---
addExpenses("Burger", "texi","electricity");
addExpenses("Biryani", "Flight","recharge");
viewExpenses();
