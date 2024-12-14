document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Erro no login: ${error.error}`);
      return;
    }

    const data = await response.json();
    localStorage.setItem('userName', data.user.name);
    alert('Login bem-sucedido!');
    window.location.href = 'dashboard.html';
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    alert('Erro no login. Tente novamente.');
  }
});
