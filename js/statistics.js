document.addEventListener('DOMContentLoaded', () => {
  const initializeDevicesChart = () => {
    const devicesCanvas = document.getElementById('devicesChart');
    if (devicesCanvas) {
      const devicesCtx = devicesCanvas.getContext('2d');
      new Chart(devicesCtx, {
        type: 'bar',
        data: {
          labels: ['Câmeras Ativas', 'Sensores Ativos', 'Outros Dispositivos'],
          datasets: [
            {
              label: 'Dispositivos',
              data: [12, 8, 5],
              backgroundColor: ['#005b99', '#ff4d4d', '#28a745'],
              hoverOffset: 6,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
          },
        },
      });
    } else {
      console.warn('Elemento devicesChart não encontrado.');
    }
  };

  const initializeEventsChart = () => {
    const eventsCanvas = document.getElementById('eventsChart');
    if (eventsCanvas) {
      const eventsCtx = eventsCanvas.getContext('2d');
      new Chart(eventsCtx, {
        type: 'bar',
        data: {
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
          datasets: [
            {
              label: 'Eventos',
              data: [50, 75, 100, 120, 90],
              backgroundColor: '#005b99',
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#333' },
            },
            y: {
              grid: { color: '#ccc' },
              ticks: { color: '#333' },
            },
          },
        },
      });
    } else {
      console.warn('Elemento eventsChart não encontrado.');
    }
  };

  const initializeUserActivityChart = () => {
    const userActivityCanvas = document.getElementById('userActivityChart');
    if (userActivityCanvas) {
      const userActivityCtx = userActivityCanvas.getContext('2d');
      new Chart(userActivityCtx, {
        type: 'line',
        data: {
          labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
          datasets: [
            {
              label: 'Atividade por Usuário',
              data: [65, 59, 80, 81, 56, 55, 40],
              borderColor: '#005b99',
              tension: 0.1,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#333' },
            },
            y: {
              grid: { color: '#ccc' },
              ticks: { color: '#333' },
            },
          },
        },
      });
    } else {
      console.warn('Elemento userActivityChart não encontrado.');
    }
  };

  const initializePerformanceChart = () => {
    const performanceCanvas = document.getElementById('performanceChart');
    if (performanceCanvas) {
      const performanceCtx = performanceCanvas.getContext('2d');
      new Chart(performanceCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
          datasets: [
            {
              label: 'Desempenho do Sistema',
              data: [45, 65, 80, 60, 75],
              borderColor: '#ff4d4d',
              tension: 0.1,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#333' },
            },
            y: {
              grid: { color: '#ccc' },
              ticks: { color: '#333' },
            },
          },
        },
      });
    } else {
      console.warn('Elemento performanceChart não encontrado.');
    }
  };

  initializeDevicesChart();
  initializeEventsChart();
  initializeUserActivityChart();
  initializePerformanceChart();
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('eventModal');
  const modalDetails = document.getElementById('modal-details');
  const closeBtn = document.querySelector('.close-btn');

  const openModal = (eventId) => {
    const events = {
      1: {
        id: '001',
        type: 'Dispositivo Conectado',
        status: 'Sucesso',
        date: '12/12/2024 14:30',
        details: 'O dispositivo foi conectado corretamente ao sistema e está ativo.',
      },
      2: {
        id: '002',
        type: 'Erro de Conexão',
        status: 'Erro',
        date: '12/12/2024 14:35',
        details: 'Ocorreu um erro de conexão, e o dispositivo não pôde se conectar.',
      },
      3: {
        id: '003',
        type: 'Dispositivo Desconectado',
        status: 'Aviso',
        date: '12/12/2024 15:00',
        details: 'O dispositivo foi desconectado e o status foi alterado para "desconectado".',
      },
      4: {
        id: '004',
        type: 'Erro de Configuração',
        status: 'Erro',
        date: '12/12/2024 15:10',
        details: 'Houve um erro de configuração ao tentar iniciar o dispositivo.',
      },
    };

    const event = events[eventId];
    modalDetails.innerHTML = `
      <p><strong>ID do Evento:</strong> ${event.id}</p>
      <p><strong>Tipo de Evento:</strong> ${event.type}</p>
      <p><strong>Status:</strong> ${event.status}</p>
      <p><strong>Data e Hora:</strong> ${event.date}</p>
      <p><strong>Detalhes:</strong> ${event.details}</p>
    `;

    modal.style.display = 'block';
  };

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  const detailButtons = document.querySelectorAll('.btn-details');
  detailButtons.forEach((button, index) => {
    button.addEventListener('click', () => openModal(index + 1));
  });
});
