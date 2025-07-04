document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.querySelector(".product-cards");
  if (productContainer) {
    fetch("../items/items.json")
      .then((res) => res.json())
      .then((data) => {
        productContainer.innerHTML = "";

        data.products.forEach((product) => {
          const card = document.createElement("div");
          card.className = "product-card";
          card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-card-img">
            <p class="price">${product.price}$</p>
            <p class="product-name">${product.name}</p>
            <button data-id="${product.id}">Add To Cart</button>
          `;
          productContainer.appendChild(card);
          
          const addButton = card.querySelector('button');
          addButton.addEventListener('click', () => {
            addToCart(product);
          });
        });
      })
      .catch((error) => {
        console.error("Failed to load products:", error);
      });
  }

  const categoryContainer = document.querySelector(".category-cards");
  if (categoryContainer) {
    fetch("../items/category.json")
      .then((res) => res.json())
      .then((data) => {
        categoryContainer.innerHTML = "";
        data.categories.forEach((category) => {
          const card = document.createElement("div");
          card.className = "category-card";
          card.innerHTML = `
            <img src="${category.image}" alt="${category.category}" class="category-img">
            <p class="category-card-title">${category.category}</p>
          `;
          categoryContainer.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Failed to load categories:", error);
      });
  }

  const burgerMenu = document.querySelector('.burger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.overlay');
  const body = document.body;

  if (burgerMenu && mobileMenu && overlay) {
    const openMenu = () => {
      burgerMenu.classList.add('open');
      mobileMenu.classList.add('show');
      overlay.classList.add('active');
      body.classList.add('no-scroll');
    };

    const closeMenu = () => {
      burgerMenu.classList.remove('open');
      mobileMenu.classList.remove('show');
      overlay.classList.remove('active');
      body.classList.remove('no-scroll');
    };

    burgerMenu.addEventListener('click', () => {
      if (mobileMenu.classList.contains('show')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener('click', closeMenu);
  }

  updateCartCount();
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  alert(`${product.name} added to cart!`);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartIcon = document.querySelector('.cart');
  
  if (cartIcon) {
    let badge = cartIcon.querySelector('.cart-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'cart-badge';
      cartIcon.appendChild(badge);
    }
    
    if (cartCount > 0) {
      badge.textContent = cartCount;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }
}