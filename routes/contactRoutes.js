const express = require('express');
const router = express.Router();

const { 
    addContact, 
    getAllContacts, 
    searchContactByName, 
    updateContact, 
    deleteContact 
} = require('../controllers/contactController'); 

// Saare Endpoints Yahan Hain
router.post('/', addContact);
router.get('/', getAllContacts);
router.get('/search', searchContactByName);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;