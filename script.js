// Store menu items data with proper categories
const menuItems = [
  {
    id: 1,
    name: "Signature Burger",
    description:
      "Premium beef patty with fresh lettuce, tomato, onion, pickles, and our secret signature sauce.",
    price: 9.99,
    category: "beef",
    image:
      "https://cdn.pixabay.com/photo/2023/09/25/22/08/ai-generated-8276129_1280.jpg",
    tags: ["Bestseller"],
  },
  {
    id: 2,
    name: "Double Cheese Deluxe",
    description:
      "Two juicy beef patties with double cheddar cheese, caramelized onions, and special sauce.",
    price: 12.99,
    category: "beef",
    image:
      "https://cdn.pixabay.com/photo/2022/08/29/17/44/burger-7419420_1280.jpg",
    tags: ["Popular"],
  },
  {
    id: 3,
    name: "Bacon Avocado",
    description:
      "Angus beef patty topped with crispy bacon, fresh avocado, lettuce, and garlic aioli.",
    price: 13.99,
    category: "beef",
    image:
      "https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1280.jpg",
    tags: ["New"],
  },
  {
    id: 4,
    name: "Spicy Jalapeño",
    description:
      "Beef patty with pepper jack cheese, fresh jalapeños, spicy mayo, and crispy onion strings.",
    price: 11.99,
    category: "beef",
    image:
      "https://cdn.pixabay.com/photo/2020/09/14/16/23/burger-5571385_1280.jpg",
    tags: ["Spicy"],
  },
  {
    id: 5,
    name: "Mushroom Swiss",
    description:
      "Beef patty topped with sautéed mushrooms, melted Swiss cheese, and truffle aioli.",
    price: 12.49,
    category: "beef",
    image:
      "https://cdn.pixabay.com/photo/2021/12/09/20/46/burger-6859072_1280.jpg",
    tags: ["Classic"],
  },
  {
    id: 6,
    name: "Veggie Deluxe",
    description:
      "Plant-based patty with fresh avocado, grilled peppers, lettuce, and vegan garlic aioli.",
    price: 10.99,
    category: "veggie",
    image:
      "https://cdn.pixabay.com/photo/2021/03/19/21/52/burger-6108495_1280.jpg",
    tags: ["Vegetarian"],
  },
];

// Cart state
let cart = [];

// DOM elements
const cartItemsEl = document.querySelector(".cart-items");
const emptyCartEl = document.querySelector(".empty-cart");
const searchInput = document.querySelector(".search-input");
const filterChips = document.querySelectorAll(".filter-chip");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const menuItem = e.target.closest(".menu-item");
      const itemId = parseInt(menuItem.dataset.id);
      addToCart(itemId);
    });
  });

  searchInput.addEventListener("input", searchItems);

  // Fixed filter functionality
  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      
      // Get the filter category from the chip text
      const filterCategory = chip.textContent.toLowerCase();
      filterItems(filterCategory);
    });
  });
});

// New function to filter items by category
function filterItems(category) {
  const menuItemElements = document.querySelectorAll(".menu-item");
  
  menuItemElements.forEach((itemElement) => {
    const itemId = parseInt(itemElement.dataset.id);
    const menuItem = menuItems.find(item => item.id === itemId);
    
    if (category === "all burgers") {
      // Show all items
      itemElement.style.display = "block";
    } else if (category === "beef" && menuItem.category === "beef") {
      itemElement.style.display = "block";
    } else if (category === "chicken" && menuItem.category === "chicken") {
      itemElement.style.display = "block";
    } else if (category === "veggie" && menuItem.category === "veggie") {
      itemElement.style.display = "block";
    } else if (category === "special" && menuItem.tags.some(tag => tag.toLowerCase().includes("special"))) {
      itemElement.style.display = "block";
    } else if (category === "bestsellers" && menuItem.tags.some(tag => tag.toLowerCase().includes("bestseller") || tag.toLowerCase().includes("popular"))) {
      itemElement.style.display = "block";
    } else {
      itemElement.style.display = "none";
    }
  });
}

// Search items
function searchItems() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  document.querySelectorAll(".menu-item").forEach((item) => {
    // Get the item details
    const name = item.querySelector(".item-name").textContent.toLowerCase();
    const description = item
      .querySelector(".item-description")
      .textContent.toLowerCase();

    if (name.includes(searchTerm) || description.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Add item to cart
function addToCart(itemId) {
  const item = menuItems.find((item) => item.id === itemId);

  if (item) {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    updateCart();
  }
}

// Remove item from cart
function removeFromCart(itemId) {
  const itemIndex = cart.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      cart.splice(itemIndex, 1);
    }

    // Update the cart UI
    updateCart();
  }
}

// Get total number of items in cart
function getTotalItems() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Update cart UI
function updateCart() {
  // Show/hide empty cart message
  if (cart.length === 0) {
    emptyCartEl.style.display = "block";
  } else {
    emptyCartEl.style.display = "none";
  }

  // Clear the cart items container (except the empty cart message)
  const cartItemsToRemove = cartItemsEl.querySelectorAll(".cart-item");
  cartItemsToRemove.forEach((item) => item.remove());

  // Add each cart item to the UI
  cart.forEach((item) => {
    const cartItemEl = document.createElement("div");
    cartItemEl.className = "cart-item";
    cartItemEl.innerHTML = `
                    <img src="${item.image}" alt="${
      item.name
    }" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-actions">
                            <div class="quantity-control">
                                <button class="quantity-btn decrease" data-id="${
                                  item.id
                                }">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn increase" data-id="${
                                  item.id
                                }">+</button>
                            </div>
                            <span class="cart-item-price">$${(
                              item.price * item.quantity
                            ).toFixed(2)}</span>
                        </div>
                    </div>
                `;

    // Add to cart items container
    cartItemsEl.appendChild(cartItemEl);

    // Add event listeners for quantity buttons
    cartItemEl.querySelector(".decrease").addEventListener("click", () => {
      removeFromCart(item.id);
    });

    cartItemEl.querySelector(".increase").addEventListener("click", () => {
      addToCart(item.id);
    });
  });

  // Update totals
  updateTotals();
  
  // Update cart icon with item count
  updateCartIcon();
}

// Update cart icon with item count
function updateCartIcon() {
  const cartIcon = document.querySelector(".cart-icon");
  const totalItems = getTotalItems();
  
  // Remove any existing count badge
  const existingBadge = cartIcon.querySelector(".cart-count");
  if (existingBadge) {
    existingBadge.remove();
  }
  
  // Add count badge if there are items
  if (totalItems > 0) {
    const countBadge = document.createElement("span");
    countBadge.className = "cart-count";
    countBadge.textContent = totalItems;
    cartIcon.appendChild(countBadge);
  }
}

// Update the cart totals
function updateTotals() {
  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const delivery = cart.length > 0 ? 2.5 : 0;
  const total = subtotal + tax + delivery;

  // Update the UI
  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("delivery").textContent =
    cart.length > 0 ? `$2.50` : `$0.00`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}