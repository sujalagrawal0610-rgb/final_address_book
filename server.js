const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config(); 
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// --- 1. MIDDLEWARES ---
app.use(cors());
app.use(express.json()); // JSON data samajhne ke liye

// --- 2. STATIC FILES (Frontend) ---
// Isse browser ko pata chalega ki 'public' folder mein hamari website hai
app.use(express.static('public'));

// --- 3. ROUTES ---
app.use('/api/contacts', contactRoutes);

// Note: Humne Welcome Route (app.get('/')) hata diya hai taaki 
// browser seedha index.html ko load kare.

// --- 4. DATABASE & SERVER START ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("🔥 Cloud Database (MongoDB) Connected!");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📂 Frontend dekhne ke liye yahan click kar: http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Database connection error:", err.message);
    });