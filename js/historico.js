document.addEventListener('DOMContentLoaded', () => {
  const eventList = document.getElementById('event-list');
  const addEventButton = document.getElementById('add-event-btn');
  const addEventModal = document.getElementById('add-event-modal');
  const closeModalButton = document.getElementById('close-modal-btn');
  const addEventForm = document.getElementById('add-event-form');
  const filterDate = document.getElementById('filter-date');
  const filterType = document.getElementById('filter-type');
  const applyFilterButton = document.getElementById('apply-filter');

  let events = [
    { id: 1, date: '2024-12-01', type: 'motion', description: 'Movimento detectado na câmera da sala' },
    { id: 2, date: '2024-12-01', type: 'access', description: 'Porta aberta no sensor da entrada' },
  ];

  function renderEvents() {
    eventList.innerHTML = '';
    events.forEach(event => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${event.date}</strong> - ${event.type.toUpperCase()}: ${event.description}
        <button onclick="editEvent(${event.id})">Editar</button>
        <button onclick="deleteEvent(${event.id})">Excluir</button>
      `;
      eventList.appendChild(li);
    });
  }

  window.editEvent = function (id) {
    const event = events.find(event => event.id === id);
    if (event) {
      document.getElementById('event-type').value = event.type;
      document.getElementById('event-description').value = event.description;
      addEventModal.style.display = 'flex';
      addEventModal.setAttribute('data-edit-id', id);
    }
  };

  window.deleteEvent = function (id) {
    events = events.filter(event => event.id !== id);
    renderEvents();
  };

  applyFilterButton.addEventListener('click', () => {
    const selectedDate = filterDate.value;
    const selectedType = filterType.value;

    const filtered = events.filter(event => {
      const matchDate = selectedDate ? event.date === selectedDate : true;
      const matchType = selectedType !== 'all' ? event.type === selectedType : true;
      return matchDate && matchType;
    });

    renderEvents(filtered);
  });

  addEventButton.addEventListener('click', () => {
    addEventModal.style.display = 'flex';
    addEventModal.removeAttribute('data-edit-id');
  });

  closeModalButton.addEventListener('click', () => {
    addEventModal.style.display = 'none';
  });

  addEventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const eventType = document.getElementById('event-type').value;
    const eventDescription = document.getElementById('event-description').value;
    const eventDate = new Date().toISOString().split('T')[0];
    const editId = addEventModal.getAttribute('data-edit-id');

    if (eventDescription) {
      if (editId) {
        const event = events.find(event => event.id === parseInt(editId));
        if (event) {
          event.type = eventType;
          event.description = eventDescription;
        }
      } else {
        const newEvent = {
          id: events.length + 1,
          date: eventDate,
          type: eventType,
          description: eventDescription
        };
        events.push(newEvent);
      }

      renderEvents();
      addEventModal.style.display = 'none';
      addEventForm.reset();
    } else {
      alert('Por favor, insira a descrição do evento.');
    }
  });

  renderEvents();
});
