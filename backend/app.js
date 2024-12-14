const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const deviceRoutes = require('./routes/devices');
const db = require('./db');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(deviceRoutes);

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, result) => {
    if (err || result.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    res.json({ message: 'Login bem-sucedido' });
  });
});


app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err) => {
    if (err) {
      console.error('Erro no cadastro:', err.message);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  });
});

const planRoutes = require('./routes/plans');
app.use(planRoutes);

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
