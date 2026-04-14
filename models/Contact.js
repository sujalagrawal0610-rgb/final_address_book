const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Bhai naam toh likhna hi padega!"],
        trim: true
    },
    phone: {
        type: String, 
        required: true,
        unique: true
    },
    email: { // Agar email bhi chahiye toh ye rakho
        type: String,
        lowercase: true,
        trim: true
    },
    address: { // "add" ki jagah "address" use karna zyada sahi hai
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', contactSchema);