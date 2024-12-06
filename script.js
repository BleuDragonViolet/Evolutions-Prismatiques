document.querySelectorAll('.timeline img').forEach(img => {
    img.addEventListener('click', () => {
        const overlay = document.querySelector('.popup-overlay');
        overlay.querySelector('img').src = img.src;
        overlay.classList.add('active');
    });
});

document.querySelector('.popup-overlay').addEventListener('click', () => {
    document.querySelector('.popup-overlay').classList.remove('active');
});

// Initialisation du panier
let totalPrice = 0;
const cartItems = new Map(); // Structure: {nom: {quantité, prix, element}}

// Fonction pour mettre à jour le prix total
function updateTotal() {
    // Affiche le total avec deux décimales sans arrondir à l'entier
    document.getElementById('total-price').textContent = `${totalPrice.toFixed(2)}€`;
}

// Fonction pour ajouter ou retirer une quantité
function updateQuantity(name, price, change) {
    const item = cartItems.get(name);
    if (!item) return;

    // Mise à jour de la quantité
    item.quantity += change;

    // Si la quantité atteint 0, griser l'article
    if (item.quantity <= 0) {
        item.quantity = 0;
        item.element.classList.add('inactive');
    } else {
        // Sinon, article actif (noir)
        item.element.classList.remove('inactive');
    }

    // Met à jour l'affichage de la quantité
    item.element.querySelector('.quantity').textContent = `x${item.quantity}`;

    // Mise à jour du prix total
    totalPrice += price * change;
    totalPrice = Math.max(0, totalPrice); // Pas de total négatif
    updateTotal();
}

// Initialiser les articles du panier
document.querySelectorAll('.timeline li').forEach(item => {
    const priceSpan = item.querySelector('.price');
    const rawPrice = priceSpan.textContent.replace('Prix : ', '').replace('€', '').trim();
    const price = parseFloat(rawPrice.replace(',', '.')) || 0; // Remplace les virgules par des points

    const name = item.firstChild.textContent.trim(); // Récupérer le nom du produit

    // Ajouter un article dans le panier (quantité 0 par défaut)
    if (!cartItems.has(name)) {
        const cartEntry = document.createElement('li');
        cartEntry.innerHTML = `
            <span class="item-name">${name}</span> 
            <span class="quantity">x0</span> 
            <span class="price">${price.toFixed(2)}€</span> <!-- Affichage des centimes -->
            <button class="decrease">−</button>
            <button class="increase">+</button>`;
        cartEntry.classList.add('inactive'); // Par défaut, en gris

        // Ajouter des événements aux boutons
        cartEntry.querySelector('.decrease').addEventListener('click', () => updateQuantity(name, price, -1));
        cartEntry.querySelector('.increase').addEventListener('click', () => updateQuantity(name, price, 1));

        cartItems.set(name, { quantity: 0, price, element: cartEntry });
        document.getElementById('cart-items').appendChild(cartEntry);
    }
});

// Gestion du bouton pour afficher/masquer les articles dans le panier
document.getElementById('toggle-cart').addEventListener('click', () => {
    const cartItems = document.getElementById('cart-items');
    cartItems.classList.toggle('hidden'); // Basculer entre visible/caché
});

// Initialisation du prix total
updateTotal();

