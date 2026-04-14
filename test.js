const mongoose = require('mongoose');
require('dotenv').config();

// Hum check kar rahe hain ki link sahi se load hua ya nahi
const uri = process.env.MONGO_URI;

if (!uri || uri.includes("TERA_PASSWORD")) {
    console.log("❌ ERROR: Bhai tune password nahi badla ya .env file save nahi ki!");
    process.exit();
}

console.log("🔄 Database se dosti karne ki koshish jaari hai...");

mongoose.connect(uri)
  .then(() => {
    console.log("🔥 SUCCESS! Tera Mac aur MongoDB Cloud ab jud chuke hain.");
    console.log("Address Book ka database ekdum ready hai.");
    process.exit(); 
  })
  .catch((err) => {
    console.log("❌ CONNECTION FAILED!");
    console.log("Error details:", err.message);
    process.exit();
  });