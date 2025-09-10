const fs = require("fs")
const filePath = "./script.json"
const dt = new Date()

function createJsonFile() {
    return fs.writeFileSync(filePath, "[]");
}
createJsonFile()

function readExpenses() {
    const previousExpenses = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(previousExpenses)
}
readExpenses()

function writeExpenses(expenses) {
    fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2))
}

function addExpenses(amount, cetegory, subCetegory, description, date) {
    const expenses = readExpenses()
    const newExpenses = { id: expenses.length + 1, amount, cetegory, subCetegory, description, date }
    expenses.push(newExpenses)
    writeExpenses(expenses)
    console.log("All users are added", expenses);

}

function viewExpenses (){
    const allExpenses = readExpenses()
    console.log(`All Expenses:`, allExpenses);

}

addExpenses("199$", "Food", "Resturent", "Mc,Donals Lunch", (dt.toLocaleDateString("en-PK")))
addExpenses("270$", "tarvel", "Flight", "Flight of UK", (dt.toLocaleDateString("en-PK")))
addExpenses("10$", "bills", "Internet Recharge", "Zong ka internet recharge kawana hai", (dt.toLocaleDateString("en-PK")))
viewExpenses()

function deleteExpense(id) {
    const expenses = readExpenses();
    const index = expenses.findIndex(exp => exp.id === id);

    if (index === -1) {
        console.log("❌ Expense not found!");
        return;
    }

    const deletedExpense = expenses[index];
    expenses.splice(index, 1); // remove

    console.log(" Expense deleted. Undo within 5 seconds...");

    // Wait for Undo
    setTimeout(() => {
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question("Do you want to undo your action?", (answer) => {
            if (answer.toLowerCase() === "yes") {
                expenses.splice(index, 0, deletedExpense); // restore
                writeExpenses(expenses);
                console.log("♻️ Delete Undone. Expense Restored!");
            } else {
                writeExpenses(expenses);
                console.log("✅ Expense Permanently Deleted.");
            }
            readline.close();
        });
    }, 5000);
}

deleteExpense(1)


function updateExpense(id) {
    const expenses = readExpenses();
    const index = expenses.findIndex(exp => exp.id === id);

    if (index === -1) {
        console.log("❌ Expense not found!");
        return;
    }

    const updateExpense = expenses[index];
    expenses.splice(index, 1); // remove

    console.log(" Expense updated within 5 sec");

    // Wait for update
    setTimeout(() => {
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question("Do you want update your expense", (answer) => {
            if (answer.toLowerCase() === "yes") {
                expenses.splice(index, 0, updateExpense); // restore
                writeExpenses(expenses);
                console.log("Enter your Expenses details");
            } else {
                writeExpenses(expenses);
                console.log("♻️ Discard Updation. Expense will not change!");
            }
            readline.close();
        });
    }, 10000);
}

updateExpense(1)







