const fs = require("fs")
const filePath = "./script.json"

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Creation of JSON file ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// JSON file creation and initialize by []

function createJsonFile() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]");
    }
}
createJsonFile();

// This function reads the JSON file previous expenses

function readExpenses() {
    const previousExpenses = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(previousExpenses)
}
readExpenses()

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Records of Expenses +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// This function writes an expenses

function writeExpenses(expenses) {
    fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2))
}

// This function reads previous expenses and push the new expenses with ID

function addExpenses(amount, category, subcategory, description) {
    const expenses = readExpenses()
    const newId = expenses.length + 1;
    const expense = {
        id: newId,
        amount: amount,
        category: category,
        subcategory: subcategory,
        description: description,
        date: new Date().toLocaleDateString("en-PK")
    }
    expenses.push(expense)
    writeExpenses(expenses)

}

// This function displays all expenses on terminal

function viewExpenses() {
    const allExpenses = readExpenses()
    console.log(`\n All Expenses:`, allExpenses);
}

// addExpenses(199, "Food acs", "Resturent", "Mc,Donals Lunch")
// addExpenses(270, "travel", "Flight", "Flight of UK")
// addExpenses(10, "bills", "Internet Recharge", "Zong ka internet recharge karwana hai")
viewExpenses()

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Updation of Expenses ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function updateExpense(id, updatedData) {
    const expenses = readExpenses()

    const index = expenses.findIndex(exp => exp.id === id);

    // In this statement if ID equals to -1 so it's returns is Expense not found!
    if (index === -1) {
        console.log("Expense not found!");
        return;
    }
    expenses[index] = { ...expenses[index], ...updatedData };
    writeExpenses(expenses);
    console.log("\n Updated Expenses:");
    console.log(" \n Your Expense is Updated:", expenses[index]);

}

// updateExpense(2, {amount:"50$" , category:"travel" , subcategory:"Texi" , description:"Travel by Texi"})


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++ Filtration of Expenses +++++++++++++++++++++++++++++++++++++++++++++++++++++++

function filterExpenses({ id, amount, cetegory, subCetegory, description, keyword }) {
    let expenses = readExpenses();

    // Filtration by id
    if (id) {
        expenses = expenses.filter(expense => expense.id === id)
    }

    // Filtration by amount
    if (amount) {
        expenses = expenses.filter(expense => expense.amount.toLowerCase() === amount.toLowerCase())
    }

    // Filtration by cetegory
    if (cetegory) {
        expenses = expenses.filter(expense => expense.cetegory.toLowerCase() === cetegory.toLowerCase())
    }

    // Filtration by subCetegory
    if (subCetegory) {
        expenses = expenses.filter(expense => expense.subCetegory.toLowerCase() === subCetegory.toLowerCase())
    }

    // Filtration by description
    if (description) {
        expenses = expenses.filter(expense => expense.description.toLowerCase() === description.toLowerCase())
    }

    // Filtration by keyword
    if (keyword) {
        expenses = expenses.filter(expense => expense.description.toLowerCase().includes(keyword.toLowerCase()));
    }
    console.log("\n Filtered Expenses");

    console.log("\n Your searched Expense:", expenses);
    return expenses;
}

// filterExpenses({ id: 2 })

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Sortation of Expenses ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function sortExpenses(field = "amount", order = "asc") {
    const expenses = readExpenses();

    const sorted = [...expenses].sort((a, b) => {
        // Sorting by id
        if (field === "id") {
            return order === "asc"
                ? a.id - (b.id)
                : b.id - (a.id);
        }
        // Sorting by amount
        else if (field === "amount") {
            return order === "asc"
                ? a.amount.localeCompare(b.amount)
                : b.amount.localeCompare(a.amount);
        }
        // Sorting by description
        else if (field === "description") {
            return order === "asc"
                ? a.description.localeCompare(b.description)
                : b.description.localeCompare(a.description);
        } else {
            return order === "asc"
                ? a[field] - b[field]
                : b[field] - a[field];
        }
    });

    console.log("\n Sorted Expense:");

    console.log(`\n Sorted your expenses by ${field} (${order}):`, sorted);
    return sorted;
}
// sortExpenses("id", "desc");

// +++++++++++++++++++++++++++++++++++++++++++++++++++++ Deletion of Expenses by ID +++++++++++++++++++++++++++++++++++++++++++++++++++++

// This function deletes the expenses by id

function deleteExpense(id) {
    const expenses = readExpenses();
    const index = expenses.findIndex(exp => exp.id === id);

    // In this statement if ID equals to -1 so it's returns is Expense not found!
    if (index === -1) {
        console.log("\n Expense not found!");
        return;
    }

    // It deletes the expense
    const deletedExpense = expenses[index];
    expenses.splice(index, 1);

    console.log("\n Undo Expense");

    console.log("\n Expense deleted. Undo within 5 seconds...");

    // +++++++++++++++++++++++++++++++++++++++++ Undo the deletion action in the timer of 5 sec +++++++++++++++++++++++++++++++++++++++++

    setTimeout(() => {

        const yes = true;
        const no = false

        if (no) {
            expenses.splice(index, 0, deletedExpense); // restore
            writeExpenses(expenses);
            console.log("\n Deletion Cancelled. Expense Restored!");
            viewExpenses()
        } else {
            writeExpenses(expenses);
            console.log("\n Expense Permanently Deleted. And your current expenses are");
            viewExpenses()
        }
    }, 5000);
}
// deleteExpense(1)

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Reports of Expenses +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function generateReports() {
    const expenses = readExpenses();

    if (expenses.length === 0) {
        console.log("\n Reports of Expenses");
        console.log("\n Expense not found!");
        return;
    }

    const now = new Date();

    const isSameMonth = (date, month, year) => {
        const d = new Date(date);
        return d.getMonth() === month && d.getFullYear() === year;
    };

    const isSameWeek = (date, refDate) => {
        const d = new Date(date);
        const weekStart = new Date(refDate);
        weekStart.setDate(refDate.getDate() - refDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return d >= weekStart && d <= weekEnd;
    };

    // 1. Total Expenses
    const totalAllTime = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    // console.log("Reports of All-Time Expenses:", totalAllTime);

    const totalMonthly = expenses
        .filter(e => isSameMonth(e.date, now.getMonth(), now.getFullYear()))
        .reduce((sum, e) => sum + Number(e.amount), 0);
        // console.log(" Reports of This Month Expenses:", totalMonthly);

    const totalWeekly = expenses
        .filter(e => isSameWeek(e.date, now))
        .reduce((sum, e) => sum + Number(e.amount), 0);
        // console.log(" Reports of This Week Expenses:", totalWeekly);

    // 2. Category Breakdown
    const categoryBreakdown = {};
    expenses.forEach(e => {
        const cat = e.category || "Uncategorized";
        categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + Number(e.amount);
    });
    // console.log("\n Reports of Category-wise Breakdown Expenses:", categoryBreakdown);

    // 3. Sub-category Breakdown
    const subCategoryBreakdown = {};
    expenses.forEach(e => {
        const sub = e.subcategory || "Unspecified";
        subCategoryBreakdown[sub] = (subCategoryBreakdown[sub] || 0) + Number(e.amount);
    });
    // console.log("\n Reports of Sub-category Breakdown Expenses:", subCategoryBreakdown);

    //4. Highest & Lowest
    const highestExpense = expenses.reduce((max, e) => (e.amount > max.amount ? e : max), expenses[0]);
    // console.log("\n Reports of Highest Expense:", highestExpense);

    const lowestExpense = expenses.reduce((min, e) => (e.amount < min.amount ? e : min), expenses[0]);
    // console.log("\n Reports of Lowest Expense:", lowestExpense);

    // 5. Average Spending
    const average = totalAllTime / expenses.length;
    // console.log("\n Reports of Average Spending Expenses:", average.toFixed(2));

    // 6. Spending Trends (monthly)
    const trends = {};
    expenses.forEach(e => {
        const d = new Date(e.date);
        const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
        trends[key] = (trends[key] || 0) + Number(e.amount);
    });
    // console.log("\n Reports of  Spending Trends Expenses (by month):", trends);
}
generateReports();