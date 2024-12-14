let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCounter() {
  const cartButton = document.querySelector('.cart-button');
  cartButton.textContent = `Carrinho (${cart.length})`;
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.push(product);

  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartCounter();
}

function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartButton = document.querySelector('.cart-button');
  cartButton.textContent = `Carrinho (${cart.length})`;
}

document.addEventListener('DOMContentLoaded', function () {
  updateCartCounter();

  const addButtons = document.querySelectorAll('.btn-add-cart');
  addButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const productItem = button.closest('.product-item');
      const productName = productItem.querySelector('strong').textContent;
      const productPrice = productItem.querySelector('p:nth-child(2)').textContent;
      const productImage = productItem.querySelector('.product-img').src;

      const product = {
        name: productName,
        price: productPrice,
        image: productImage
      };

      addToCart(product);
    });
  });
});

function loadCart() {
  const cartContainer = document.querySelector('.cart-items');
  cartContainer.innerHTML = '';

  cart.forEach(product => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="item-info">
                <h3>${product.name}</h3>
                <p>Preço: R$ ${product.price.toFixed(2)}</p>
                <div class="quantity-control">
                    <button class="btn-quantity-minus" onclick="changeQuantity('${product.id}', -1)">-</button>
                    <span class="quantity">${product.quantity}</span>
                    <button class="btn-quantity-plus" onclick="changeQuantity('${product.id}', 1)">+</button>
                </div>
                <button class="btn-remove-item" onclick="removeFromCart('${product.id}')">Remover</button>
            </div>
        `;
    cartContainer.appendChild(cartItem);
  });

  updateTotal();
}

function changeQuantity(productId, change) {
  const product = cart.find(p => p.id === productId);
  if (product) {
    product.quantity += change;
    if (product.quantity < 1) product.quantity = 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(product => product.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function updateTotal() {
  const total = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  document.querySelector('.cart-summary p').innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
}

document.querySelectorAll('.btn-add-cart').forEach(button => {
  button.addEventListener('click', (event) => {
    const productElement = event.target.closest('.product-item');
    const productName = productElement.querySelector('strong').textContent;
    const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('R$ ', '').replace(',', '.'));
    const productImg = productElement.querySelector('img').src;
    const productId = `${productName}-${Math.random()}`;

    const product = {
      id: productId,
      name: productName,
      price: productPrice,
      img: productImg,
      quantity: 1
    };

    addToCart(product);
  });
});

if (document.body.classList.contains('cart-page')) {
  loadCart();
  updateCartCounter();
}
