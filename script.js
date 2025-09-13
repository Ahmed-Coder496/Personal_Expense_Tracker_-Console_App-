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

addExpenses("199$", "Food", "Resturent", "Mc,Donals Lunch", (dt.toLocaleDateString("en-PK")))
addExpenses("270$", "tarvel", "Flight", "Flight of UK", (dt.toLocaleDateString("en-PK")))
addExpenses("10$", "bills", "Internet Recharge", "Zong ka internet recharge kawana hai", (dt.toLocaleDateString("en-PK")))
viewExpenses()

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

// +++++++++++++++++++++++++++++++++++++++++++ Undo the deletion action in the timer of 5 sec +++++++++++++++++++++++++++++++++++++++++++

    setTimeout(() => {
            if (false) {
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
deleteExpense(1)

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Updation of Expenses ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function updateExpense(id){
    const expense = readExpenses()
    const index = expenses.findIndex(exp => exp.id === id);

    // In this statement if ID equals to -1 so it's returns is Expense not found!
    if (index === -1) {
        console.log("Expense not found!");
        return;
    }

    const updateExpense = expense[index]


}

updateExpense()







