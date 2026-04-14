const Contact = require('../models/Contact');

// 1. Naya Contact Add Karne Ke Liye
const addContact = async (req, res) => {
    try {
        const { name, phone, email, address } = req.body;

        const newContact = await Contact.create({ 
            name, 
            phone, 
            email, 
            address 
        });

        res.status(201).json({ 
            success: true, 
            message: 'Contact saved!', 
            data: newContact 
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                success: false, 
                message: 'Phone number already exists!' 
            });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Saare Contacts Dekhne Ke Liye (Sorted A-Z Fix)
const getAllContacts = async (req, res) => {
    try {
        // Yahan collation add kiya hai taaki capital aur small letters sath mein sort hon
        const contacts = await Contact.find()
            .collation({ locale: 'en', strength: 2 })
            .sort({ name: 1 });
            
        res.status(200).json({ 
            success: true, 
            count: contacts.length, 
            data: contacts 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Naam Se Search Karne Ke Liye
const searchContactByName = async (req, res) => {
    try {
        const { name } = req.query;
        const contacts = await Contact.find({ 
            name: { $regex: new RegExp(name, 'i') } 
        });
        res.status(200).json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Contact Update Karne Ke Liye (ID ke base par)
const updateContact = async (req, res) => {
    try {
        const updated = await Contact.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 5. Contact Delete Karne Ke Liye
const deleteContact = async (req, res) => {
    try {
        const deleted = await Contact.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, message: 'Deleted!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { 
    addContact, 
    getAllContacts, 
    searchContactByName, 
    updateContact, 
    deleteContact 
};