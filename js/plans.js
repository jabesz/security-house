document.addEventListener('DOMContentLoaded', () => {
  const planList = document.getElementById('plan-list');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalPrice = document.getElementById('modal-price');

  const plans = [
    {
      name: 'Básico',
      description: 'Monitoramento 24h',
      price: 50.00
    },
    {
      name: 'Premium',
      description: 'Monitoramento + Controle de Dispositivos',
      price: 120.00
    },
    {
      name: 'Avançado',
      description: 'Monitoramento + Controle + Notificações',
      price: 200.00
    }
  ];

  function renderPlans() {
    plans.forEach(plan => {
      const planCard = document.createElement('div');
      planCard.classList.add('plan-card');
      planCard.innerHTML = `
        <h3>${plan.name}</h3>
        <p>${plan.description}</p>
        <p><strong>R$ ${plan.price.toFixed(2)}</strong>/mês</p>
        <button onclick="verMais('${plan.name}', '${plan.description}', ${plan.price})">Ver Mais</button>
        <button onclick="adicionarAoCarrinho('${plan.name}', ${plan.price})">Adicionar ao Carrinho</button>
      `;
      planList.appendChild(planCard);
    });
  }

  window.verMais = (name, description, price) => {
    modalTitle.textContent = name;
    modalDescription.textContent = description;
    modalPrice.textContent = `R$ ${price.toFixed(2)}`;
    modal.style.display = 'flex';

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  };

  window.adicionarAoCarrinho = (name, price) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push({ name, price });

    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${name} foi adicionado ao carrinho!`);

    window.location.href = 'carrinho.html';
  };


  window.fecharModal = () => {
    modal.style.display = 'none';
  };

  renderPlans();
});
