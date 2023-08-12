import { products, allProducts } from "./data.js";
import { cookieLibrary } from "./components/Sign-in/cookie.js";

const sliderWrapper = document.querySelector(".sliderWrapper");
const menuItemElements = document.querySelectorAll(".menuItem");
const productImg = document.querySelector(".product-img");
const productTitle = document.querySelector(".product-title");
const productPrice = document.querySelector(".product-price");
const colorElements = document.querySelectorAll(".color");
const sizeElements = document.querySelector(".sizes");
const productButton = document.querySelector(".product-button");
const filterButtons = document.querySelectorAll(".filter-button");
const filterSearch = document.querySelector(".filter-Search");
const cardContainer = document.querySelector(".card-container");
const colorContainer = document.querySelector(".colors");

let chosenProduct = products[0];

// top product slider
function setProductInfo(product) {
  const { title, price, colors } = product;
  productTitle.textContent = title;
  productPrice.textContent = price ? `$${price}` : "";
  productImg.src = colors[0].img;
  colorElements.forEach((colorElement, index) => {
    colorElement.style.backgroundColor = colors[index].code;
  });
}

menuItemElements.forEach((menuItem, index) => {
  menuItem.addEventListener("click", () => {
    sliderWrapper.style.transform = `translateX(${-100 * index}vw)`;
    chosenProduct = products[index];
    setProductInfo(chosenProduct);
    colorElements.forEach((colorElement) => {
      colorElement.classList.remove("selected-color");
    });
  });
});

// top product buy
colorContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("color")) {
    const colorElements = colorContainer.querySelectorAll(".color");
    colorElements.forEach((colorElement) => {
      colorElement.classList.remove("selected-color");
    });
    const index = Array.from(colorElements).indexOf(event.target);
    productImg.src = chosenProduct.colors[index].img;
    event.target.classList.add("selected-color");
  }
});

sizeElements.addEventListener("click", selectedSize);

function selectedSize(e) {
  if (e.target.classList.contains("size")) {
    e.target.parentElement
      .querySelectorAll(".size")
      .forEach((size) => size.classList.remove("active-size"));
    e.target.classList.add("active-size");
  }
}

// all products card
function createCard(product) {
  const card = document.createElement("div");
  card.classList.add("card", product.category);

  const { image, name, text, price } = product;

  card.innerHTML = `
    <img src=${image} alt="Product Image" />
    <h3>${name}</h3>
    <p>${text}</p>
    <span class="price">Price: ${price}</span>
    <button class="buy-button">Buy</button>
  `;

  const buyButton = card.querySelector(".buy-button");
  buyButton.addEventListener("click", () => {
    showEnlargedCard(product);
  });

  return card;
}

//  flitter buttons

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    displayCards(category);
  });
});

filterSearch.addEventListener("input", searchCards);

function displayCards(category) {
  cardContainer.innerHTML = "";

  allProducts.forEach((product) => {
    if (category === "all" || product.category === category) {
      const card = createCard(product);
      cardContainer.appendChild(card);
    }
  });
}

displayCards("all");

function searchCards(e) {
  const searchTerm = e.target.value.toLowerCase().trim();

  cardContainer.innerHTML = "";

  allProducts.forEach((product) => {
    if (product.name.toLowerCase().includes(searchTerm)) {
      const card = createCard(product);
      cardContainer.appendChild(card);
    }
  });
}

//  enlarged card
function showEnlargedCard(product) {
  const enlargedCard = document.createElement("div");
  enlargedCard.classList.add("product", "enlarged");
  enlargedCard.id = "product";

  const { image, name, price, desc, size } = product;

  enlargedCard.innerHTML = `
    <img src=${image} alt="" class="product-img" />
    <div class="product-details">
      <h1 class="product-title">${name}</h1>
      <h2 class="product-price">${price}</h2>
      <p class="product-desc">${desc}</p>
      <div class="sizes">${size
        .map((s) => `<div class="size">${s}</div>`)
        .join("")}</div>
        <div class="prod-purchase">
          <div class="quantity-wrapper">
            <span id="decrease" class="quantity-btn">-</span>
            <span class="quantity">0</span>
            <span id="increase" class="quantity-btn">+</span>
          </div>
        </div>
      <button class="product-button">BUY NOW!</button>
    </div>
  `;

  const buyButton = enlargedCard.querySelector(".product-button");
  const sizesBtn = enlargedCard.querySelector(".sizes");
  const enQuantityBtns = enlargedCard.querySelectorAll(".quantity-btn");
  const enProdQuantity = enlargedCard.querySelector(".quantity");
  buyButton.addEventListener("click", addToCart);
  sizesBtn.addEventListener("click", selectedSize);

  enQuantityBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.id === "increase") {
        enProdQuantity.innerText = parseInt(enProdQuantity.innerText) + 1;
      } else if (prodQuantity.innerText > 0) {
        enProdQuantity.innerText = parseInt(enProdQuantity.innerText) - 1;
      }
    });
  });

  document.body.appendChild(enlargedCard);
}
// close enlarged card and cart
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const enlargedCard = document.querySelector(".enlarged");

    cartItems.classList.remove("show-cart");

    if (enlargedCard) {
      document.body.removeChild(enlargedCard);
    }
  }
});

document.addEventListener("click", closeEnCardCart);
function closeEnCardCart(e) {
  const enlargedCard = document.querySelector(".enlarged");
  const isBuyButtonClicked = e.target.classList.contains("buy-button");
  if (enlargedCard) {
    const isClickInsideEnlargedCard = enlargedCard.contains(e.target);
    if (!isClickInsideEnlargedCard && !isBuyButtonClicked) {
      document.body.removeChild(enlargedCard);
    }
  }
  const isClickInsideCart = cartItems.contains(e.target);
  const isClickOnDelCart = e.target.id === "remove-item";
  const isCartIconClicked =
    e.target.parentElement.classList.contains("open-cart");

  if (!isClickInsideCart && !isCartIconClicked && !isClickOnDelCart) {
    cartItems.classList.remove("show-cart");
  }
}
//  cart
let prodQuantity = document.querySelector(".quantity");
const notification = document.querySelector(".notification");
const quantityBtns = document.querySelectorAll(".quantity-btn");

const cartItems = document.querySelector(".cart-items");
const cartOpen = document.querySelector(".open-cart");

cartOpen.addEventListener("click", () =>
  cartItems.classList.toggle("show-cart")
);

quantityBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => quantityCounter(e, btn));
});

function quantityCounter(e, btn) {
  prodQuantity = e.target.parentElement.querySelector(".quantity");
  if (btn.id === "increase") {
    prodQuantity.innerText = parseInt(prodQuantity.innerText) + 1;
  } else if (prodQuantity.innerText > 0) {
    prodQuantity.innerText = parseInt(prodQuantity.innerText) - 1;
  }
}

productButton.addEventListener("click", addToCart);

const CartItemsContent = document.querySelector(".cart-items-content");
CartItemsContent.addEventListener("click", (e) => {
  if (e.target.id === "remove-item") {
    deleteFromCart(e);
  }
});

function addToCart(e) {
  const productSize = e.target.parentElement.querySelector(".active-size");
  const productImgSrc = e.target.parentElement.parentElement
    .querySelector("img")
    .getAttribute("src");
  prodQuantity = e.target.parentElement.querySelector(".quantity");

  if (prodQuantity.textContent !== "0" && productSize.textContent) {
    // close enlarged card
    const enlargedCard = document.querySelector(".enlarged");

    if (enlargedCard) {
      document.body.removeChild(enlargedCard);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });

    const emptyMessage = document.querySelector(".cart-empty");
    if (emptyMessage) {
      emptyMessage.remove();
    }
    notification.textContent =
      parseInt(notification.textContent) + parseFloat(prodQuantity.textContent);
    notification.classList.add("show-notification");

    let checkout = document.querySelector(".checkout");

    if (!checkout) {
      checkout = document.createElement("button");
      checkout.classList.add("checkout");
      checkout.textContent = "Checkout";
      CartItemsContent.appendChild(checkout);
    }

    const totalPrice =
      parseFloat(productPrice.textContent.slice(1)) *
      parseFloat(prodQuantity.textContent);
    const cartItemContainer = document.createElement("section");
    cartItemContainer.classList.add("cart-item");
    cartItemContainer.setAttribute(
      "data-quantity",
      `${prodQuantity.textContent}`
    );

    const cartItem = `
      <img src=${productImgSrc} alt="product" />
      <div>
        <h4>${productTitle.textContent}</h4>
        <p class="price-container"> ${productPrice.textContent} x ${prodQuantity.textContent} = <span class="price">$${totalPrice}</span></p>
    <div>Size: ${productSize.textContent}</div>
      </div>
      <span class="quantity-wrapper">
          <span id="decrease" class="quantity-btn">-</span>
          <span class="quantity">${prodQuantity.textContent}</span>
          <span id="increase" class="quantity-btn">+</span>
      </span>
      <img id="remove-item" src="img/icon-delete.svg" alt="remove item icon" />
      `;

    cartItemContainer.innerHTML = cartItem;
    CartItemsContent.insertBefore(cartItemContainer, checkout);

    const carQuantityBtns = cartItemContainer.querySelectorAll(".quantity-btn");
    carQuantityBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => quantityCounter(btn, e));
    });

    function quantityCounter(btn, e) {
      prodQuantity = e.target.parentElement.querySelector(".quantity");
      let newPrice =
        e.target.parentElement.parentElement.querySelector(".price-container");
      if (btn.id === "increase") {
        prodQuantity.innerText = parseInt(prodQuantity.innerText) + 1;
        newPrice.innerHTML = `${productPrice.textContent} x ${
          prodQuantity.textContent
        } = <span class="price">$${
          parseFloat(productPrice.textContent.slice(1)) *
          parseFloat(prodQuantity.textContent)
        }</span>`;
        notification.textContent = parseInt(notification.textContent) + 1;
      } else if (prodQuantity.innerText > 0) {
        prodQuantity.innerText = parseInt(prodQuantity.innerText) - 1;
        newPrice.innerHTML = `${productPrice.textContent} x ${
          prodQuantity.textContent
        } = <span class="price">$${
          parseFloat(productPrice.textContent.slice(1)) *
          parseFloat(prodQuantity.textContent)
        }</span>`;
        notification.textContent = parseInt(notification.textContent) - 1;
      }
    }
  }
}

function deleteFromCart(e) {
  e.target.parentElement.remove();
  if (CartItemsContent.children.length === 1) {
    let checkout = document.querySelector(".checkout");
    if (checkout) {
      checkout.remove();
      notification.textContent === "0";
      notification.classList.remove("show-notification");
    }

    const cartEmpty = document.createElement("p");
    cartEmpty.classList.add("cart-empty");
    cartEmpty.textContent = "Your cart is empty.";
    CartItemsContent.appendChild(cartEmpty);
  }

  notification.textContent =
    parseInt(notification.textContent) -
    parseInt(e.target.parentElement.querySelector(".quantity").textContent);
}
// scroll to the top button
const scrollButton = document.createElement("button");
scrollButton.classList.add("scroll-to-top");
scrollButton.innerHTML = "&#8593;";

document.body.appendChild(scrollButton);

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
});

scrollButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// burger icon
const menuBtns = document.querySelectorAll(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuBtns.forEach((menuBtn) =>
  menuBtn.addEventListener("click", () => {
    menuBtns.forEach((menuBtn) => {
      menuBtn.classList.toggle("open");
    });
    navLinks.classList.toggle("nav-show");
  })
);
// login
const userProfile = document.querySelector(".user");
const signinBox = document.querySelector(".signin-box");
const signBtn = document.querySelector(".signin-button");
const signBtnA = document.querySelector(".sign-btn");

const userImg = document.querySelector(".user img");

userProfile.addEventListener("click", () => {
  signinBox.classList.toggle("show-profile");
});

document.addEventListener("click", (event) => {
  if (
    !userProfile.contains(event.target) &&
    !signinBox.contains(event.target)
  ) {
    signinBox.classList.remove("show-profile");
  }
});

// logout

if (cookieLibrary.getCookie("name")) {
  let userName = document.querySelector(".signin-box div ");
  userImg.setAttribute("src", "./img/image-avatar.png");
  signBtn.classList.add("sign-out");
  if (!userName) {
    userName = document.createElement("div");
    userName.innerHTML = `User name: ${cookieLibrary.getCookie("name")}`;
    signinBox.insertBefore(userName, signinBox.firstChild);
    signBtnA.innerHTML = "Sign Out";
  }
} else {
  signBtnA.innerHTML = "Sign In";
  signBtn.classList.remove("sign-out");
}
const logoutBtn = document.querySelector(".sign-out");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
function logout() {
  console.log("ed");
  cookieLibrary.deleteCookie("name");
  cookieLibrary.deleteCookie("gender");
  cookieLibrary.deleteCookie("age");
  userImg.setAttribute("src", "./img/A-Letter.jpg");
}
