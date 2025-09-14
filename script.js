const fs = require("fs")
const filePath = "./script.json"
const dt = new Date()

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Creation of JSON file ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// JSON file creation and initialize by []

function createJsonFile() {
    return fs.writeFileSync(filePath, "[]");
}
createJsonFile()

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

function addExpenses(amount, cetegory, subCetegory, description, date) {
    const expenses = readExpenses()
    const newExpenses = { id: expenses.length + 1, amount, cetegory, subCetegory, description, date }
    expenses.push(newExpenses)
    writeExpenses(expenses)

}

// This function displays all expenses on terminal

function viewExpenses() {
    const allExpenses = readExpenses()
    console.log(`All Expenses:`, allExpenses);
}

addExpenses("199$", "Food acs", "Resturent", "Mc,Donals Lunch", (dt.toLocaleDateString("en-PK")))
addExpenses("270$", "travel", "Flight", "Flight of UK", (dt.toLocaleDateString("en-PK")))
addExpenses("10$", "bills", "Internet Recharge", "Zong ka internet recharge karwana hai", (dt.toLocaleDateString("en-PK")))
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
    console.log("Your Expense is Updated:", expenses[index]);
}

// updateExpense(2, {amount:"50$" , cetegory:"travel" , subCetegory:"Texi" , description:"Travel by Texi" , date: (dt.toLocaleDateString("en-PK"))})


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++ Filtration of Expenses +++++++++++++++++++++++++++++++++++++++++++++++++++++++

function filterExpenses({ id, amount, cetegory, subCetegory, description, keyword }) {
    const expenses = readExpenses();

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

    console.log("Your searched Expense:", expenses);
    return expenses;
}


// filterExpenses({ keyword: "internet" })

// +++++++++++++++++++++++++++++++++++++++++++++++++++++ Deletion of Expenses by ID +++++++++++++++++++++++++++++++++++++++++++++++++++++

// This function deletes the expenses by id

function deleteExpense(id) {
    const expenses = readExpenses();
    const index = expenses.findIndex(exp => exp.id === id);

    // In this statement if ID equals to -1 so it's returns is Expense not found!
    if (index === -1) {
        console.log("Expense not found!");
        return;
    }

    // It deletes the expense
    const deletedExpense = expenses[index];
    expenses.splice(index, 1);

    console.log(" Expense deleted. Undo within 5 seconds...");

    // +++++++++++++++++++++++++++++++++++++++++ Undo the deletion action in the timer of 5 sec +++++++++++++++++++++++++++++++++++++++++

    setTimeout(() => {

        const yes = true;
        const no = false

        if (no) {
            expenses.splice(index, 0, deletedExpense); // restore
            writeExpenses(expenses);
            console.log("Deletion Cancelled. Expense Restored!");
            viewExpenses()
        } else {
            writeExpenses(expenses);
            console.log("Expense Permanently Deleted. And your current expenses are");
            viewExpenses()
        }
    }, 5000);
}
// deleteExpense(1)

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

    console.log(`Sorted your expenses by ${field} (${order}):`, sorted);
    return sorted;
}
sortExpenses("id", "desc");





