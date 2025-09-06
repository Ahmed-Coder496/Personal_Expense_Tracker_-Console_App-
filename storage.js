const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "expenses.json");

// Read data
function readExpenses() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

// Write data
function writeExpenses(expenses) {
  fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2));
}

module.exports = { readExpenses, writeExpenses };
