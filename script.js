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

addExpenses(299, "Food", "Resturent", "Mc,Donals Lunch", (dt.toLocaleDateString("en-PK")))
addExpenses(299, "tarvel", "Flight", "Flight of UK", (dt.toLocaleDateString("en-PK")))
viewExpenses()

