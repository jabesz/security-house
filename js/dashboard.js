document.getElementById('logout-button').addEventListener('click', () => {
  alert('Logout realizado com sucesso!');
  window.location.href = 'login.html';
});

function loadDashboard() {
  const userName = localStorage.getItem('userName');
  const chosenPlan = JSON.parse(localStorage.getItem('chosenPlan'));
  const activeCameras = 5;
  const activeSensors = 3;
  const devices = [
    { name: 'Câmera Frontal', status: 'Ativo' },
    { name: 'Sensor de Movimento', status: 'Ativo' },
    { name: 'Câmera Lateral', status: 'Inativo' },
  ];

  if (userName) {
    document.querySelector('.dashboard-header h1').textContent = `Bem-vindo, ${userName}`;
  } else {
    document.querySelector('.dashboard-header h1').textContent = 'Bem-vindo!';
  }

  if (chosenPlan) {
    document.getElementById('user-plan').textContent = `${chosenPlan.name} (R$ ${chosenPlan.price.toFixed(2)})`;
  } else {
    document.getElementById('user-plan').textContent = 'Nenhum plano escolhido ainda.';
  }

  document.getElementById('active-cameras').textContent = activeCameras;
  document.getElementById('active-sensors').textContent = activeSensors;

  const deviceList = document.getElementById('device-list');
  devices.forEach(device => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${device.name}</span>
      <span>${device.status}</span>
    `;
    deviceList.appendChild(li);
  });
}

loadDashboard();

function saveChosenPlan(plan) {
  localStorage.setItem('chosenPlan', JSON.stringify(plan));
}

function loadChosenPlan() {
  return JSON.parse(localStorage.getItem('chosenPlan'));
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-devices');

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const deviceCards = document.querySelectorAll('.device-card');
    deviceCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
  });
});

function showNotification(message) {
  const notificationBar = document.getElementById('notification-bar');
  if (!notificationBar.classList.contains('show')) {
    notificationBar.innerHTML = `<p>${message}</p>`;
    notificationBar.classList.add('show');
    setTimeout(() => {
      notificationBar.classList.remove('show');
    }, 5000);
  }
}

setTimeout(() => {
  showNotification('Movimento detectado na câmera da sala!');
}, 3000);

document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('activeDevicesChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Câmeras Ativas', 'Sensores Ativos', 'Outros Dispositivos'],
      datasets: [
        {
          label: 'Dispositivos Ativos',
          data: [10, 5, 2],
          backgroundColor: ['#005b99', '#ff4d4d', '#28a745'],
        },
      ],
    },
  });
});

function carregarPlano() {
  const planoSalvo = localStorage.getItem('plano');

  if (planoSalvo) {
    const plano = JSON.parse(planoSalvo);
    document.getElementById('plano-nome').innerText = `Plano: ${plano.nome}`;
    document.getElementById('plano-preco').innerText = `Preço: ${plano.preco}`;
  } else {
    document.getElementById('plano').innerText = 'Você ainda não tem um plano.';
  }
}

document.addEventListener('DOMContentLoaded', carregarPlano);

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-devices');
  const deviceCards = document.querySelectorAll('.device-card');

  searchInput.addEventListener('input', function (event) {
    const searchTerm = event.target.value.toLowerCase();

    deviceCards.forEach(function (card) {
      const deviceName = card.querySelector('h3').textContent.toLowerCase();

      if (deviceName.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});