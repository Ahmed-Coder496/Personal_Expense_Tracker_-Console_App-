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

addExpenses("299$", "Food", "Resturent", "Mc,Donals Lunch", (dt.toLocaleDateString("en-PK")))
addExpenses("209$", "tarvel", "Flight", "Flight of UK", (dt.toLocaleDateString("en-PK")))
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

        readline.question("Do you want to undo? (yes/no): ", (answer) => {
            if (answer.toLowerCase() === "y") {
                expenses.splice(index, 0, deletedExpense); // restore
                writeExpenses(expenses);
                console.log("♻️ Delete Undone. Expense Restored!");
            } else {
                writeExpenses(expenses);
                console.log("✅ Expense Permanently Deleted.");
            }
            readline.close();
        });
    }, 1000);
}

deleteExpense(1)
// function deleteExpenses (id){
//     fs.unlinkSync(filePath , id);
// }
// deleteExpenses([1])
