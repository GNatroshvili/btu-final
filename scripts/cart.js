document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  document.querySelector(".products-list").addEventListener("click", (e) => {
    const productElement = e.target.closest(".product");
    if (!productElement) return;

    const productId = productElement.dataset.id;

    if (e.target.classList.contains("decrease")) {
      updateQuantity(productId, -1);
    } else if (e.target.classList.contains("increase")) {
      updateQuantity(productId, 1);
    } else if (e.target.classList.contains("delete-button")) {
      removeFromCart(productId);
    }
  });

  document.querySelector(".products-list").addEventListener("change", (e) => {
    if (e.target.matches(".product-quantity input")) {
      const productElement = e.target.closest(".product");
      const productId = productElement.dataset.id;
      const newQuantity = parseInt(e.target.value);

      if (!isNaN(newQuantity)) {
        setQuantity(productId, newQuantity);
      } else {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const item = cart.find((item) => item.id == productId);
        if (item) e.target.value = item.quantity;
      }
    }
  });
});

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productsList = document.querySelector(".products-list");

  productsList.innerHTML = "";

  if (cart.length === 0) {
    productsList.innerHTML = `
      <div class="empty-cart-wrapper">
        <img src="assets/empty-shopping-cart.webp" alt="Empty shopping cart" class="empty-cart-image">
        <p class="empty-cart-title">Your cart is empty</p>
      </div>
    `;
    updateOrderSummary(cart);
    return;
  }

  cart.forEach((item) => {
    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.dataset.id = item.id;
    productElement.innerHTML = `
      <img class="product-img" src="${item.image}" alt="${item.name}" />
      <div class="product-content">
        <div class="product-info">
          <h3>${item.name}</h3>
          <p>#${item.id}</p>
        </div>
        <div class="product-second-line">
          <div class="product-quantity">
            <button class="decrease">−</button>
            <input type="text" value="${item.quantity}" />
            <button class="increase">+</button>
          </div>
          <p class="product-price">$${(item.price * item.quantity).toFixed(
            2
          )}</p>
          <img class="delete-button" src="./assets/Delete-Button.svg" alt="delete-button" />
        </div>
      </div>
    `;
    productsList.appendChild(productElement);
  });

  updateOrderSummary(cart);
}

function updateQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemIndex = cart.findIndex((item) => item.id == productId);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity += change;

    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
}

function setQuantity(productId, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemIndex = cart.findIndex((item) => item.id == productId);

  if (itemIndex !== -1) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id != productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function updateOrderSummary(cart) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const shipping = subtotal > 0 ? 29 : 0;
  const total = subtotal + tax + shipping;

  document.querySelector(
    ".subtotal .black-style-large"
  ).textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector(
    ".tax .black-style-large"
  ).textContent = `$${tax.toFixed(2)}`;
  document.querySelector(
    ".shipping .black-style-large"
  ).textContent = `$${shipping.toFixed(2)}`;
  document.querySelector(
    ".total .black-style-large"
  ).textContent = `$${total.toFixed(2)}`;
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartIcon = document.querySelector(".cart");

  if (cartIcon) {
    let badge = cartIcon.querySelector(".cart-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "cart-badge";
      cartIcon.appendChild(badge);
    }

    if (cartCount > 0) {
      badge.textContent = cartCount;
      badge.style.display = "flex";
    } else {
      badge.style.display = "none";
    }
  }
}
