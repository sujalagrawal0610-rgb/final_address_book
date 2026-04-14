const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const searchInput = document.getElementById('searchInput');

// --- YE HAI MAIN CHANGE ---
// Agar local chalana ho toh 'http://localhost:10000' use kar sakte ho
const API_URL = 'https://final-address-book.onrender.com/api/contacts';

// 1. Saare contacts fetch karke dikhana
async function fetchContacts() {
    try {
        const res = await fetch(API_URL);
        const json = await res.json();
        displayContacts(json.data);
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

// 2. Contacts ko screen par render karna
function displayContacts(contacts) {
    contactList.innerHTML = '';
    if (!contacts || contacts.length === 0) {
        contactList.innerHTML = '<p style="text-align:center;">Koi contact nahi mila bhai!</p>';
        return;
    }
    contacts.forEach(c => {
        const card = document.createElement('div');
        card.className = 'contact-card';
        card.innerHTML = `
            <h3>${c.name}</h3>
            <p>📞 ${c.phone}</p>
            <p>🏠 ${c.address || 'No Address'}</p>
            <button class="delete-btn" onclick="deleteContact('${c._id}')">Delete</button>
        `;
        contactList.appendChild(card);
    });
}

// 3. Naya contact save karna
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newContact = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newContact)
        });

        if (res.ok) {
            contactForm.reset();
            fetchContacts(); // List update karo
        } else {
            const err = await res.json();
            alert(err.message);
        }
    } catch (err) {
        alert("Server se connect nahi ho pa raha!");
    }
});

// 4. Search logic
searchInput.addEventListener('input', async (e) => {
    try {
        const res = await fetch(`${API_URL}/search?name=${e.target.value}`);
        const json = await res.json();
        displayContacts(json.data);
    } catch (err) {
        console.error("Search error:", err);
    }
});

// 5. Delete logic
async function deleteContact(id) {
    if (confirm('Pakka delete karna hai?')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchContacts();
        } catch (err) {
            alert("Delete fail ho gaya!");
        }
    }
}

// Shuruat mein contacts load karo
fetchContacts();