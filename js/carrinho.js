const cartContainer = document.getElementById("cart-container");
const totalPriceElement = document.getElementById("total-price");
const checkoutButton = document.getElementById("checkout-button");

function displayCart() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Carrinho vazio</p>';
  } else {
    cartItemsContainer.innerHTML = '';

    cart.forEach(function (item) {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-info">
          <h3>${item.name}</h3>
          <p>Preço: ${item.price}</p>
          <div class="quantity-control">
            <button class="btn-quantity-minus">-</button>
            <span class="quantity">1</span>
            <button class="btn-quantity-plus">+</button>
          </div>
          <button class="btn-remove-item">Remover</button>
        </div>
      `;

      cartItemsContainer.appendChild(itemElement);

      const removeButton = itemElement.querySelector('.btn-remove-item');
      removeButton.addEventListener('click', function () {
        removeItemFromCart(item);
      });
    });
  }

  updateCartSummary();
}

function removeItemFromCart(itemToRemove) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart = cart.filter(function (item) {
    return item.name !== itemToRemove.name;
  });

  localStorage.setItem('cart', JSON.stringify(cart));

  displayCart();
  updateCartCounter();
}

function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalElement = document.querySelector('.cart-summary p');

  let total = 0;
  cart.forEach(function (item) {
    const price = parseFloat(item.price.toString().replace('R$', '').replace(',', '.'));
    total += price;
  });

  totalElement.innerHTML = `<strong>Total: R$ ${total.toFixed(2).replace('.', ',')}</strong>`;
}


document.addEventListener('DOMContentLoaded', function () {
  displayCart();
});

document.addEventListener("DOMContentLoaded", function () {
  const btnPlus = document.querySelectorAll(".btn-quantity-plus");
  const btnMinus = document.querySelectorAll(".btn-quantity-minus");
  const quantitySpans = document.querySelectorAll(".quantity");
  const removeButtons = document.querySelectorAll(".btn-remove-item");
  const totalPriceElement = document.querySelector(".cart-summary p");
  const checkoutButton = document.querySelector(".btn-checkout");

  function updateTotal() {
    const cartItems = document.querySelectorAll(".cart-item");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cartItems.forEach((cartItem, index) => {
      const quantity = parseInt(cartItem.querySelector(".quantity").textContent);
      const price = parseFloat(cart[index].price.toString().replace('R$', '').replace(',', '.'));
      total += price * quantity;
    });

    totalPriceElement.innerHTML = `<strong>Total: R$ ${total.toFixed(2).replace('.', ',')}</strong>`;
  }


  btnPlus.forEach((button, index) => {
    button.addEventListener("click", () => {
      const quantitySpan = quantitySpans[index];
      let quantity = parseInt(quantitySpan.textContent);
      quantity += 1;
      quantitySpan.textContent = quantity;
      updateTotal();
    });
  });

  btnMinus.forEach((button, index) => {
    button.addEventListener("click", () => {
      const quantitySpan = quantitySpans[index];
      let quantity = parseInt(quantitySpan.textContent);
      if (quantity > 1) {
        quantity -= 1;
        quantitySpan.textContent = quantity;
        updateTotal();
      }
    });
  });

  removeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const cartItem = button.closest(".cart-item");
      cartItem.remove();
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateTotal();
    });
  });

  checkoutButton.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
      const chosenPlan = cart[0];
      localStorage.setItem("chosenPlan", JSON.stringify(chosenPlan));
      alert("Compra finalizada com sucesso! Plano escolhido: " + chosenPlan.name);

      localStorage.removeItem("cart");
      document.querySelector('.cart-items').innerHTML = '<p>Carrinho vazio</p>';
      updateCartSummary();

      window.location.href = "dashboard.html";
    } else {
      alert("Seu carrinho está vazio!");
    }
  });


  updateTotal();
});

