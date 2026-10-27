/* ============================================================
   Roderick's Poultry Farm — Chicken E-Commerce Website
   Script: product data, search, filtering, product details, cart
   ============================================================ */

/* ---------------- Product Data ---------------- */
const products = [
    {
        id: 1,
        name: "Rhode Island Red Pullet",
        breed: "Rhode Island Red",
        age: "4-month",
        ageLabel: "4 Months Old",
        price: 185.00,
        image: "https://images.unsplash.com/photo-1573439371045-8302525f59b3?auto=format&fit=crop&w=500&q=80",
        description: "A friendly and hardy young pullet known for excellent egg production and a calm temperament. Perfect for first-time chicken keepers.",
        stock: 12,
        available: true,
    },
    {
        id: 2,
        name: "Australorp Hen",
        breed: "Australorp",
        age: "5-month",
        ageLabel: "5 Months Old",
        price: 295.00,
        image: "https://images.unsplash.com/photo-1564270317147-2d238b1ff3a2?auto=format&fit=crop&w=500&q=80",
        description: "Laying-ready Australorp hen with glossy black feathers and a reputation for prolific brown egg laying. Docile and easy to handle.",
        stock: 8,
        available: true,
    },
    {
        id: 3,
        name: "Plymouth Rock Chicken",
        breed: "Plymouth Rock",
        age: "4-month",
        ageLabel: "4 Months Old",
        price: 170.00,
        image: "https://images.unsplash.com/photo-1590449926830-f675e9e834a8?auto=format&fit=crop&w=500&q=80",
        description: "Barred Plymouth Rock pullet, a dual-purpose breed valued for both meat and eggs. Cold-hardy and adaptable to backyard coops.",
        stock: 10,
        available: true,
    },
    {
        id: 4,
        name: "Native Philippine Chicken",
        breed: "Native (Philippine)",
        age: "6-month-plus",
        ageLabel: "6 Months & Older",
        price: 380.00,
        image: "https://images.unsplash.com/photo-1555333522-9899d622d87b?auto=format&fit=crop&w=500&q=80",
        description: "Hardy native chicken raised free-range. Flavorful meat and eggs, well-adapted to local climate and conditions.",
        stock: 15,
        available: true,
    },
    {
        id: 5,
        name: "Australorp Pullet",
        breed: "Australorp",
        age: "4-month",
        ageLabel: "4 Months Old",
        price: 195.00,
        image: "https://images.unsplash.com/photo-1588712706284-2f5563789d0b?auto=format&fit=crop&w=500&q=80",
        description: "Young Australorp pullet with gentle nature and strong laying potential. Ideal for small farms and home flocks.",
        stock: 0,
        available: false,
    },
    {
        id: 6,
        name: "Rhode Island Red Hen",
        breed: "Rhode Island Red",
        age: "6-month-plus",
        ageLabel: "6 Months & Older",
        price: 410.00,
        image: "https://images.unsplash.com/photo-1551287969-ba17a8b4b1e2?auto=format&fit=crop&w=500&q=80",
        description: "Mature Rhode Island Red hen in peak laying condition. Reliable brown egg layer with a robust, friendly disposition.",
        stock: 6,
        available: true,
    },
    {
        id: 7,
        name: "Plymouth Rock Hen",
        breed: "Plymouth Rock",
        age: "5-month",
        ageLabel: "5 Months Old",
        price: 310.00,
        image: "https://images.unsplash.com/photo-1520941741121-d3f615c63141?auto=format&fit=crop&w=500&q=80",
        description: "Laying-ready Plymouth Rock hen with distinctive barred plumage. A dependable layer and great forager.",
        stock: 9,
        available: true,
    },
    {
        id: 8,
        name: "Native Rooster",
        breed: "Native (Philippine)",
        age: "6-month-plus",
        ageLabel: "6 Months & Older",
        price: 430.00,
        image: "https://images.unsplash.com/photo-1543840316-25b97b399e5a?auto=format&fit=crop&w=500&q=80",
        description: "Strong native rooster, free-range raised. Vigorous and protective, suited for breeding or backyard flock leadership.",
        stock: 4,
        available: true,
    },
];

/* ---------------- Cart State ---------------- */
const cart = []; // { id, name, breed, ageLabel, price, image, quantity }

/* ---------------- DOM Elements ---------------- */
const productsGrid = document.getElementById("products-grid");
const featuredGrid = document.getElementById("featured-grid");
const searchInput = document.getElementById("search-input");
const ageFilter = document.getElementById("age-filter");
const sortSelect = document.getElementById("sort-select");
const availabilityFilter = document.getElementById("availability-filter");
const noResults = document.getElementById("no-results");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const mobileCartCountEl = document.getElementById("mobile-cart-count");
const cartSubtotalEl = document.getElementById("cart-subtotal");
const cartTotalEl = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

/* Product modal */
const productModal = document.getElementById("product-modal");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalContent = document.getElementById("modal-content");
const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalBreed = document.getElementById("modal-breed");
const modalAge = document.getElementById("modal-age");
const modalPrice = document.getElementById("modal-price");
const modalStock = document.getElementById("modal-stock");
const modalDescription = document.getElementById("modal-description");
const modalQuantityEl = document.getElementById("modal-quantity");
const modalAddBtn = document.getElementById("modal-add-btn");
let currentModalProduct = null;
let modalQuantity = 1;

/* ---------------- Currency Formatting ---------------- */
function formatPeso(amount) {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
    }).format(amount);
}

/* ---------------- Render Products ---------------- */
function renderProducts(list) {
    productsGrid.innerHTML = "";

    if (!list || list.length === 0) {
        noResults.classList.remove("hidden");
        return;
    }

    noResults.classList.add("hidden");

    list.forEach((product) => {
        const card = document.createElement("div");
        card.className =
            "product-card bg-white rounded-2xl overflow-hidden border border-amber-100 flex flex-col hover:shadow-xl transition-all duration-200 group";

        const badge = product.available
            ? `<span class="absolute top-3 left-3 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">Available</span>`
            : `<span class="absolute top-3 left-3 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">Out of Stock</span>`;

        card.innerHTML = `
            <div class="relative product-image h-48">
                ${badge}
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-opacity duration-200 opacity-0 group-hover:opacity-100"></div>
            </div>
            <div class="p-5 flex flex-col flex-1">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-bold text-charcoal leading-tight">${product.name}</h3>
                </div>
                <div class="flex items-center gap-1 text-xs text-charcoal/50 uppercase tracking-wider mb-2">
                    <span>${product.breed}</span>
                    <span class="px-1">•</span>
                    <span>${product.ageLabel}</span>
                </div>
                <div class="flex items-baseline gap-2 mb-3">
                    <span class="text-xl font-bold text-emerald-700">${formatPeso(product.price)}</span>
                    <span class="text-sm text-charcoal/50">each</span>
                </div>
                <p class="text-sm text-charcoal/60 mb-4 line-clamp-2">${product.description}</p>
                <div class="mt-auto flex gap-2">
                    <button onclick="openProductDetails(${product.id})" class="flex-1 bg-white border border-amber-200 text-charcoal py-2.5 rounded-xl font-medium hover:bg-amber-50 transition-all text-sm">View Details</button>
                    <button onclick="addToCart(${product.id}, 1, this)" class="flex-1 ${product.available ? "bg-emerald-700 hover:bg-emerald-800 text-white" : "bg-charcoal/10 text-charcoal/40 cursor-not-allowed"} py-2.5 rounded-xl font-medium transition-all text-sm disabled:opacity-50" ${!product.available ? "disabled" : ""}>
                        ${product.available ? "Add to Cart" : "Out of Stock"}
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

/* ---------------- Render Featured (first 4 available) ---------------- */
function renderFeatured() {
    featuredGrid.innerHTML = "";
    const featured = products.filter((p) => p.available).slice(0, 4);

    featured.forEach((product) => {
        const card = document.createElement("div");
        card.className =
            "product-card bg-white rounded-2xl overflow-hidden border border-amber-100 flex flex-col hover:shadow-xl transition-all duration-200 group";

        card.innerHTML = `
            <div class="relative product-image h-48">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
            </div>
            <div class="p-5 flex flex-col flex-1">
                <h3 class="text-lg font-bold text-charcoal mb-1">${product.name}</h3>
                <div class="text-xs text-charcoal/50 uppercase tracking-wider mb-2">${product.breed} · ${product.ageLabel}</div>
                <div class="flex items-baseline gap-2 mb-4">
                    <span class="text-xl font-bold text-emerald-700">${formatPeso(product.price)}</span>
                    <span class="text-sm text-charcoal/50">each</span>
                </div>
                <button onclick="addToCart(${product.id}, 1, this)" class="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 rounded-xl font-medium transition-all text-sm">
                    Add to Cart
                </button>
            </div>
        `;
        featuredGrid.appendChild(card);
    });
}

/* ---------------- Filtering / Search / Sorting ---------------- */
function getFilteredProducts() {
    const search = searchInput.value.toLowerCase().trim();
    const age = ageFilter.value;
    const availability = availabilityFilter.value;

    let result = products.filter((p) => {
        const matchesSearch =
            p.name.toLowerCase().includes(search) ||
            p.breed.toLowerCase().includes(search);
        const matchesAge = age === "all" || p.age === age;
        const matchesAvailability =
            availability === "all" ||
            (availability === "available" && p.available) ||
            (availability === "out-of-stock" && !p.available);
        return matchesSearch && matchesAge && matchesAvailability;
    });

    const sort = sortSelect.value;
    if (sort === "price-low") {
        result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
        result.sort((a, b) => b.price - a.price);
    }

    return result;
}

function applyFilters() {
    const list = getFilteredProducts();
    renderProducts(list);
}

/* ---------------- Category Filter Shortcut ---------------- */
function filterByAge(age) {
    ageFilter.value = age;
    // Scroll to shop section
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
    applyFilters();
}

/* ---------------- Event Listeners ---------------- */
searchInput.addEventListener("input", applyFilters);
ageFilter.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);
availabilityFilter.addEventListener("change", applyFilters);

/* ---------------- Product Details Modal ---------------- */
function openProductDetails(id) {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    currentModalProduct = product;
    modalQuantity = 1;

    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalName.textContent = product.name;
    modalBreed.textContent = product.breed;
    modalAge.textContent = product.ageLabel;
    modalPrice.textContent = formatPeso(product.price);
    modalDescription.textContent = product.description;

    const stockText = product.available
        ? `In stock: ${product.stock} available`
        : `Out of stock`;
    modalStock.textContent = stockText;
    modalStock.className = product.available
        ? "text-sm font-medium text-emerald-700"
        : "text-sm font-medium text-amber-700";

    modalQuantityEl.textContent = "1";

    modalAddBtn.textContent = product.available ? "Add to Cart" : "Out of Stock";
    modalAddBtn.disabled = !product.available;

    productModal.classList.remove("hidden");
    // small timeout to allow display:block before opacity transition
    requestAnimationFrame(() => {
        modalBackdrop.classList.remove("opacity-0");
        modalContent.classList.remove("scale-95", "opacity-0");
        modalContent.classList.add("scale-100", "opacity-100");
    });

    document.body.style.overflow = "hidden";
}

function closeProductModal() {
    modalBackdrop.classList.add("opacity-0");
    modalContent.classList.remove("scale-100", "opacity-100");
    modalContent.classList.add("scale-95", "opacity-0");
    setTimeout(() => {
        productModal.classList.add("hidden");
        document.body.style.overflow = "";
    }, 300);
}

modalBackdrop.addEventListener("click", closeProductModal);

function changeModalQuantity(delta) {
    if (!currentModalProduct) return;
    const newQty = modalQuantity + delta;
    if (newQty < 1) return;
    if (currentModalProduct.available && newQty > currentModalProduct.stock) return;
    modalQuantity = newQty;
    modalQuantityEl.textContent = String(modalQuantity);
}

modalAddBtn.addEventListener("click", () => {
    if (!currentModalProduct || !currentModalProduct.available) return;
    const qty = modalQuantity;
    if (qty > currentModalProduct.stock) return;
    addToCart(currentModalProduct.id, qty, modalAddBtn);
    closeProductModal();
});

/* ---------------- Cart Functions ---------------- */
function addToCart(productId, quantity = 1, triggerEl = null) {
    const product = products.find((p) => p.id === productId);
    if (!product || !product.available) return;

    const existing = cart.find((item) => item.id === productId);
    const requestedQty = existing ? existing.quantity + quantity : quantity;

    if (requestedQty > product.stock) {
        alert(`Only ${product.stock} ${product.name}(s) available.`);
        return;
    }

    if (existing) {
        existing.quantity = requestedQty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            breed: product.breed,
            ageLabel: product.ageLabel,
            price: product.price,
            image: product.image,
            quantity: quantity,
        });
    }

    updateCartUI();
    openCart();

    // brief visual feedback on button
    if (triggerEl) {
        const original = triggerEl.innerHTML;
        triggerEl.innerHTML = "Added!";
        triggerEl.classList.add("added-to-cart");
        setTimeout(() => {
            triggerEl.innerHTML = original;
            triggerEl.classList.remove("added-to-cart");
        }, 1000);
    }
}

function changeCartQuantity(productId, delta) {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;

    const product = products.find((p) => p.id === productId);
    const newQty = item.quantity + delta;

    if (newQty < 1) {
        removeFromCart(productId);
        return;
    }

    if (product && newQty > product.stock) {
        alert(`Only ${product.stock} ${product.name}(s) available.`);
        return;
    }

    item.quantity = newQty;
    updateCartUI();
}

function removeFromCart(productId) {
    const index = cart.findIndex((i) => i.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCartUI();
    }
}

function clearCart() {
    cart.length = 0;
    updateCartUI();
    closeCart();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
    cartCountEl.textContent = totalItems;
    mobileCartCountEl.textContent = totalItems;

    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    cartSubtotalEl.textContent = formatPeso(subtotal);
    cartTotalEl.textContent = formatPeso(subtotal);

    checkoutBtn.disabled = totalItems === 0;
    if (totalItems === 0) {
        checkoutBtn.classList.add("opacity-50", "cursor-not-allowed");
    } else {
        checkoutBtn.classList.remove("opacity-50", "cursor-not-allowed");
    }

    renderCartItems();
}

function renderCartItems() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-10 text-charcoal/40 text-sm">
                Your cart is empty.<br>
                <button onclick="closeCart()" class="text-emerald-700 font-medium hover:underline mt-2 block mx-auto">Start shopping</button>
            </div>
        `;
        return;
    }

    cart.forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        const inStock = product ? item.quantity <= product.stock : true;

        const itemEl = document.createElement("div");
        itemEl.className = "flex gap-4 items-center border-b border-amber-50 pb-4 last:border-0";
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg shadow-sm">
            <div class="flex-1">
                <div class="flex justify-between items-baseline">
                    <h4 class="font-bold text-charcoal text-sm">${item.name}</h4>
                    <span class="text-sm font-bold text-emerald-700">${formatPeso(item.price * item.quantity)}</span>
                </div>
                <div class="text-xs text-charcoal/50 mt-1">${item.breed} · ${item.ageLabel}</div>
                <div class="flex items-center gap-3 mt-3">
                    <button onclick="changeCartQuantity(${item.id}, -1)" class="w-8 h-8 rounded border border-amber-200 flex items-center justify-center text-charcoal hover:bg-amber-50">−</button>
                    <span class="w-8 text-center font-bold text-sm text-charcoal">${item.quantity}</span>
                    <button onclick="changeCartQuantity(${item.id}, 1)" class="w-8 h-8 rounded border border-amber-200 flex items-center justify-center text-charcoal hover:bg-amber-50">+</button>
                    ${!inStock ? `<span class="text-xs text-amber-700 font-bold">Limit reached</span>` : ""}
                    <button onclick="removeFromCart(${item.id})" class="text-charcoal/40 hover:text-amber-700 underline underline-offset-2">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });
}

/* ---------------- Cart Sidebar ---------------- */
function openCart() {
    cartSidebar.classList.remove("translate-x-full");
    cartOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeCart() {
    cartSidebar.classList.add("translate-x-full");
    cartOverlay.classList.add("hidden");
    document.body.style.overflow = "";
}

cartOverlay.addEventListener("click", closeCart);

/* ---------------- Mobile Menu ---------------- */
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

function toggleMobileMenu() {
    mobileMenu.classList.toggle("hidden");
}
function closeMobileMenu() {
    mobileMenu.classList.add("hidden");
}

mobileMenuBtn.addEventListener("click", toggleMobileMenu);

/* Close mobile menu when clicking a nav link */
document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

/* ---------------- Navigation scroll effect ---------------- */
const mainNav = document.getElementById("main-nav");
window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        mainNav.classList.add("shadow-sm");
    } else {
        mainNav.classList.remove("shadow-sm");
    }
});

/* ---------------- Helpers ---------------- */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------------- Initialize ---------------- */
renderFeatured();
renderProducts(products);
