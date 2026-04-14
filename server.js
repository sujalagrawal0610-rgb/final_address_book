const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config(); 
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// --- 1. MIDDLEWARES ---
app.use(cors());
app.use(express.json()); 

// --- 2. STATIC FILES (Frontend) ---
app.use(express.static('public'));

// --- 3. ROUTES ---
app.use('/api/contacts', contactRoutes);

// --- 4. DATABASE & SERVER START ---
// Render ke liye '0.0.0.0' specify karna aur ek hi baar listen karna best hai
const PORT = process.env.PORT || 10000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("🔥 Cloud Database (MongoDB) Connected!");
        // Sirf ek baar yahan listen karo
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Database connection error:", err.message);
        process.exit(1); // Agar DB connect na ho toh process exit kar do
    });