document.addEventListener('DOMContentLoaded', () => {
  const playButtons = document.querySelectorAll('.btn-action.play');
  const fullScreenButtons = document.querySelectorAll('.btn-action.full-screen');
  const alertForm = document.getElementById('alert-form');
  const alertTitleInput = document.getElementById('alert-title');
  const alertMessageInput = document.getElementById('alert-message');
  const modalSuccess = document.getElementById('modal-success');
  const closeModalBtn = document.querySelector('.close-btn');
  const responseMessageDiv = document.getElementById('response-message');

  playButtons.forEach((button, index) => {
    const video = button.closest('.camera-card').querySelector('video');

    button.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        button.textContent = 'Pausar';
      } else {
        video.pause();
        button.textContent = 'Reproduzir';
      }
    });
  });

  fullScreenButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const video = event.target.closest('.camera-card').querySelector('video');
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    });
  });

  alertForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = alertTitleInput.value.trim();
    const message = alertMessageInput.value.trim();

    if (title === '' || message === '') {
      responseMessageDiv.textContent = 'Por favor, preencha todos os campos.';
      return;
    }

    responseMessageDiv.textContent = '';
    showModalSuccess();

    alertTitleInput.value = '';
    alertMessageInput.value = '';
  });

  function showModalSuccess() {
    modalSuccess.style.display = 'flex';
    modalSuccess.style.opacity = '1';
    modalSuccess.style.pointerEvents = 'auto';
  }

  closeModalBtn.addEventListener('click', () => {
    modalSuccess.style.opacity = '0';
    modalSuccess.style.pointerEvents = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modalSuccess) {
      modalSuccess.style.opacity = '0';
      modalSuccess.style.pointerEvents = 'none';
    }
  });
});

const cameraGrid = document.getElementById("camera-grid");
const addCameraBtn = document.getElementById("add-camera-btn");

function createCameraCard(cameraId) {
  const card = document.createElement("div");
  card.classList.add("camera-card");
  card.setAttribute("data-camera-id", cameraId);

  card.innerHTML = `
    <h3>Câmera ${cameraId}</h3>
    <video controls autoplay muted>
      <source src="../videos/camera${cameraId}.mp4" type="video/mp4">
      Seu navegador não suporta vídeos.
    </video>
    <div class="camera-controls">
      <button class="btn-action play">Pausar</button>
      <button class="btn-action full-screen"><i class="fas fa-expand"></i></button>
    </div>
    <p>Status: <span class="status-active">Ativa</span></p>
    <div class="camera-actions">
      <button class="toggle-power"><i class="fas fa-power-off"></i></button>
      <button class="delete"><i class="fas fa-trash"></i></button>
    </div>
  `;

  const togglePowerBtn = card.querySelector(".toggle-power");
  const deleteBtn = card.querySelector(".delete");

  togglePowerBtn.addEventListener("click", () => togglePower(card));
  deleteBtn.addEventListener("click", () => deleteCamera(card));

  return card;
}

let cameraCounter = 0;
addCameraBtn.addEventListener("click", () => {
  cameraCounter++;
  const newCard = createCameraCard(cameraCounter);
  cameraGrid.appendChild(newCard);
});

function togglePower(card) {
  const statusSpan = card.querySelector(".status-active, .status-inactive");
  const isActive = statusSpan.classList.contains("status-active");

  if (isActive) {
    statusSpan.classList.replace("status-active", "status-inactive");
    statusSpan.textContent = "Inativa";
  } else {
    statusSpan.classList.replace("status-inactive", "status-active");
    statusSpan.textContent = "Ativa";
  }
}

function deleteCamera(card) {
  card.remove();
}
