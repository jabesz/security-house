document.getElementById('cadastro-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log('Dados enviados:', { name, email, password });

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro do servidor:', errorData);
      alert(`Erro: ${errorData.error}`);
      return;
    }

    const data = await response.json();
    alert(data.message);
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Erro na conexão:', error);
    alert('Erro de conexão. Tente novamente mais tarde.');
  }
});
