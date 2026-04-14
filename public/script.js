const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const searchInput = document.getElementById('searchInput');

// 1. Saare contacts fetch karke dikhana
async function fetchContacts() {
    const res = await fetch('/api/contacts');
    const json = await res.json();
    displayContacts(json.data);
}

// 2. Contacts ko screen par render karna
function displayContacts(contacts) {
    contactList.innerHTML = '';
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

    const res = await fetch('/api/contacts', {
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
});

// 4. Search logic
searchInput.addEventListener('input', async (e) => {
    const res = await fetch(`/api/contacts/search?name=${e.target.value}`);
    const json = await res.json();
    displayContacts(json.data);
});

// 5. Delete logic
async function deleteContact(id) {
    if (confirm('Pakka delete karna hai?')) {
        await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
        fetchContacts();
    }
}

// Shuruat mein contacts load karo
fetchContacts();