// fs module import کیا (file system کے لیے)
const fs = require("fs");

// data.json کا path
const filePath = "./script.json";

// JSON file سے data پڑھنے والا function
function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data); // string → JSON
}

// JSON file میں data لکھنے والا function
function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// نیا user add کرنے والا function
function addUser(name, age) {
  const users = readData(); // پرانا data پڑھو
  const newUser = { id: users.length + 1, name, age };

  users.push(newUser);      // نیا user add کرو
  writeData(users);         // دوبارہ file میں save کرو

  console.log("✅ User Added:", newUser);
}

// تمام users دیکھنے والا function
function viewUsers() {
  const users = readData();
  console.log("📒 All Users:", users);
}

// --- Example Run ---
addUser("Ali", 20);
addUser("Sara", 25);
addUser("Ahmed", 25);
viewUsers();
