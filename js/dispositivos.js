document.addEventListener('DOMContentLoaded', () => {
  const deviceList = document.getElementById('device-list');
  const logItems = document.getElementById('log-items');
  const addDeviceForm = document.getElementById('add-device-form');
  const deviceNameInput = document.getElementById('device-name');
  const deviceTypeSelect = document.getElementById('device-type');
  const deviceLocationInput = document.getElementById('device-location');
  const filterStatusSelect = document.getElementById('filter-status');
  const filterTypeSelect = document.getElementById('filter-type');

  let devices = [
    { id: 1, name: 'Câmera da Sala', type: 'Câmera', location: 'Sala de Estar', status: 'Ativo' },
    { id: 2, name: 'Sensor de Movimento', type: 'Sensor', location: 'Entrada', status: 'Inativo' }
  ];

  let logs = [
    { time: '10:30', message: 'Dispositivo "Câmera da Sala" ligado.' },
    { time: '10:35', message: 'Dispositivo "Sensor de Movimento" desligado.' },
    { time: '10:40', message: 'Novo dispositivo "Câmera 2" adicionado.' }
  ];

  function renderDevices() {
    deviceList.innerHTML = devices
      .map(device => `
        <div class="device-card">
          <h3>${device.name}</h3>
          <p>Status: <span class="device-status ${device.status.toLowerCase()}">${device.status}</span></p>
          <p>Localização: ${device.location}</p>
          <button class="btn-control" onclick="controlarDispositivo(${device.id})">Controlar</button>
          <button class="btn-edit" onclick="editarDispositivo(${device.id})">Editar</button>
          <button class="btn-delete" onclick="removerDispositivo(${device.id})">Remover</button>
        </div>
      `).join('');
  }

  function renderLogs() {
    logItems.innerHTML = logs
      .map(log => `
        <div class="log-item">
          <span class="log-time">[${log.time}]</span>
          <span class="log-message">${log.message}</span>
        </div>
      `).join('');
  }

  function updateStatistics() {
    document.getElementById('total-devices').textContent = devices.length;
    document.getElementById('active-devices').textContent = devices.filter(device => device.status === 'Ativo').length;
    document.getElementById('inactive-devices').textContent = devices.filter(device => device.status === 'Inativo').length;
  }

  function filtrarDispositivos() {
    const filterStatus = filterStatusSelect.value;
    const filterType = filterTypeSelect.value;

    const filteredDevices = devices.filter(device => {
      return (filterStatus === 'all' || device.status.toLowerCase() === filterStatus) &&
        (filterType === 'all' || device.type.toLowerCase() === filterType);
    });

    deviceList.innerHTML = filteredDevices
      .map(device => `
        <div class="device-card">
          <h3>${device.name}</h3>
          <p>Status: <span class="device-status ${device.status.toLowerCase()}">${device.status}</span></p>
          <p>Localização: ${device.location}</p>
          <button class="btn-control" onclick="controlarDispositivo(${device.id})">Controlar</button>
          <button class="btn-edit" onclick="editarDispositivo(${device.id})">Editar</button>
          <button class="btn-delete" onclick="removerDispositivo(${device.id})">Remover</button>
        </div>
      `).join('');
  }

  addDeviceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const deviceName = deviceNameInput.value.trim();
    const deviceType = deviceTypeSelect.value;
    const deviceLocation = deviceLocationInput.value.trim();

    if (deviceName && deviceLocation) {
      if (window.editingDeviceId) {
        const device = devices.find(dev => dev.id === window.editingDeviceId);
        if (device) {
          device.name = deviceName;
          device.type = deviceType;
          device.location = deviceLocation;

          logs.push({ time: new Date().toLocaleTimeString(), message: `Dispositivo "${deviceName}" editado.` });

          window.editingDeviceId = null;
        }
      } else {
        const newDevice = {
          id: devices.length + 1,
          name: deviceName,
          type: deviceType,
          location: deviceLocation,
          status: 'Ativo'
        };

        devices.push(newDevice);
        logs.push({ time: new Date().toLocaleTimeString(), message: `Novo dispositivo "${deviceName}" adicionado.` });
      }

      deviceNameInput.value = '';
      deviceLocationInput.value = '';

      renderDevices();
      renderLogs();
      updateStatistics();
    }
  });

  window.controlarDispositivo = function (id) {
    const device = devices.find(dev => dev.id === id);
    if (device) {
      device.status = device.status === 'Ativo' ? 'Inativo' : 'Ativo';
      logs.push({ time: new Date().toLocaleTimeString(), message: `Dispositivo "${device.name}" ${device.status === 'Ativo' ? 'ligado' : 'desligado'}.` });

      renderDevices();
      renderLogs();
      updateStatistics();
    }
  };

  window.editarDispositivo = function (id) {
    const device = devices.find(dev => dev.id === id);
    if (device) {
      deviceNameInput.value = device.name;
      deviceTypeSelect.value = device.type;
      deviceLocationInput.value = device.location;

      window.editingDeviceId = id;

      const submitButton = addDeviceForm.querySelector(".btn-submit");
      submitButton.textContent = "Salvar Alterações";
    }
  };

  window.removerDispositivo = function (id) {
    const deviceIndex = devices.findIndex(dev => dev.id === id);
    if (deviceIndex !== -1) {
      const device = devices.splice(deviceIndex, 1)[0];
      logs.push({ time: new Date().toLocaleTimeString(), message: `Dispositivo "${device.name}" removido.` });

      renderDevices();
      renderLogs();
      updateStatistics();
    }
  };

  window.ligarTodos = function () {
    devices.forEach(device => {
      if (device.status === 'Inativo') {
        device.status = 'Ativo';
        logs.push({ time: new Date().toLocaleTimeString(), message: `Dispositivo "${device.name}" ligado.` });
      }
    });
    renderDevices();
    renderLogs();
    updateStatistics();
  };

  window.desligarTodos = function () {
    devices.forEach(device => {
      if (device.status === 'Ativo') {
        device.status = 'Inativo';
        logs.push({ time: new Date().toLocaleTimeString(), message: `Dispositivo "${device.name}" desligado.` });
      }
    });
    renderDevices();
    renderLogs();
    updateStatistics();
  };

  window.reiniciarDispositivos = function () {
    devices.forEach(device => {
      device.status = 'Inativo';
      logs.push({ time: new Date().toLocaleTimeString(), message: `Dispositivo "${device.name}" desligado.` });
    });
    renderDevices();
    renderLogs();
    updateStatistics();

    setTimeout(() => {
      devices.forEach(device => {
        device.status = 'Ativo';
        logs.push({ time: new Date().toLocaleTimeString(), message: `Dispositivo "${device.name}" ligado novamente.` });
      });

      renderDevices();
      renderLogs();
      updateStatistics();
    }, 5000);
  };

  renderDevices();
  renderLogs();
  updateStatistics();

  filterStatusSelect.addEventListener('change', filtrarDispositivos);
  filterTypeSelect.addEventListener('change', filtrarDispositivos);
});
