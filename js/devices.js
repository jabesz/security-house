function updatePermissions(userId) {
  const userSelect = document.getElementById(userId);
  const selectedPermission = userSelect.value;
  alert(`Permissão para ${userId.replace('user', 'Usuário')} foi atualizada para: ${selectedPermission}`);

  const now = new Date();
  const dateString = now.toLocaleDateString();
  const actionText = `${dateString}: Dispositivo ${userId.replace('user', '')} teve a permissão alterada para ${selectedPermission.charAt(0).toUpperCase() + selectedPermission.slice(1)}.`;
  const historyList = document.querySelector('.history-section ul');
  const newHistoryItem = document.createElement('li');
  newHistoryItem.textContent = actionText;
  historyList.prepend(newHistoryItem);
}

function showDetails(deviceId) {
  const modal = document.getElementById('modal');
  const eventDetails = document.getElementById('event-details');

  let detailsText = '';
  switch (deviceId) {
    case 'device1':
      detailsText = 'Este dispositivo está seguro, sem problemas conhecidos.';
      break;
    case 'device2':
      detailsText = 'Este dispositivo está em risco alto devido à falta de atualizações de segurança.';
      break;
    case 'device3':
      detailsText = 'Este dispositivo está seguro, monitoramento regular em andamento.';
      break;
    case 'device4':
      detailsText = 'Este dispositivo está seguro, todas as permissões estão em conformidade.';
      break;
    case 'device5':
      detailsText = 'Este dispositivo está em risco alto, recomenda-se a revisão das configurações de segurança.';
      break;
    default:
      detailsText = 'Sem detalhes disponíveis.';
      break;
  }

  eventDetails.textContent = detailsText;

  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function displayNotification(message, type) {
  const notificationsSection = document.querySelector('.notifications-section ul');
  const newNotification = document.createElement('li');
  newNotification.innerHTML = `<strong>${type}:</strong> ${message}`;
  notificationsSection.prepend(newNotification);
}

window.onload = function () {
  displayNotification('Dispositivo 2 está em risco alto!', 'Alerta');
  displayNotification('Dispositivo 5 está em risco alto!', 'Alerta');
  displayNotification('Permissões atualizadas com sucesso.', 'Informação');
};

function updatePermissions(userId) {
  const userSelect = document.getElementById(userId);
  const selectedPermission = userSelect.value;

  alert(`Permissão para ${userId.replace('user', 'Usuário')} foi atualizada para: ${selectedPermission}`);

  const now = new Date();
  const dateString = now.toLocaleDateString();
  const actionText = `${dateString}: Dispositivo ${userId.replace('user', '')} teve a permissão alterada para ${selectedPermission.charAt(0).toUpperCase() + selectedPermission.slice(1)}.`;
  const historyList = document.querySelector('.history-section ul');

  const newHistoryItem = document.createElement('li');
  newHistoryItem.textContent = actionText;
  historyList.prepend(newHistoryItem);

  displayNotification(`Permissão do dispositivo ${userId.replace('user', '')} atualizada para ${selectedPermission.charAt(0).toUpperCase() + selectedPermission.slice(1)}.`, 'Informação');
}

function displayNotification(message, type) {
  const notificationsSection = document.querySelector('.notifications-section ul');
  const newNotification = document.createElement('li');
  newNotification.innerHTML = `<strong>${type}:</strong> ${message}`;
  notificationsSection.prepend(newNotification);
}
