document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".product-cards");

  fetch("../items/items.json")
    .then((res) => res.json())
    .then((data) => {
      container.innerHTML = "";

      data.products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="product-card-img">
          <p class="price">${product.price}$</p>
          <p class="product-name">${product.name}</p>
          <button>Add To Cart</button>
        `;
        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Failed to load products:", error);
    });
});

//fetching categories

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".category-cards");

  fetch("../items/category.json") // Corrected path
    .then((res) => res.json())
    .then((data) => {
      container.innerHTML = "";

      // Corrected from data.products to data.categories
      data.categories.forEach((category) => {
        const card = document.createElement("div");
        card.className = "category-card";
        card.innerHTML = `
          <img src="${category.image}" alt="${category.category}" class="category-img">
          <p class="category-card-title">${category.category}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Failed to load categories:", error); // Changed message for clarity
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.querySelector('.burger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.overlay');
  const body = document.body;

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

  if (burgerMenu && mobileMenu && overlay) {
    burgerMenu.addEventListener('click', () => {
      if (mobileMenu.classList.contains('show')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener('click', () => {
      closeMenu();
    });
  }
});

