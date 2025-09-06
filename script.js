const { readExpenses, writeExpenses } = require("./storage");

// Add new expense
function addExpense(amount, category, subCategory, description) {
  const expenses = readExpenses();

  const newExpense = {
    id: expenses.length + 1,  // sequential ID
    amount: amount,
    category: category,
    subCategory: subCategory,
    description: description,
    date: new Date().toLocaleString()
  };

  expenses.push(newExpense);
  writeExpenses(expenses);

  console.log("✅ Expense Added:", newExpense);
}

// View all expenses
function viewExpenses() {
  const expenses = readExpenses();
  if (expenses.length === 0) {
    console.log("⚠️ No expenses found.");
  } else {
    console.log("📒 All Expenses:");
    expenses.forEach(exp => {
      console.log(`${exp.id}. $${exp.amount} | ${exp.category} → ${exp.subCategory} | ${exp.description} | ${exp.date}`);
    });
  }
}

// Example usage:
addExpense(25.5, "Food", "Restaurant", "Lunch at McDonald's");
addExpense(100, "Bills", "Electricity", "Electricity bill for August");
viewExpenses();
