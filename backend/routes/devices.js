const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { name, type, location } = req.body;

  if (!name || !type || !location) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const query = 'INSERT INTO devices (name, type, location) VALUES (?, ?, ?)';
  db.query(query, [name, type, location], (err) => {
    if (err) {
      console.error('Erro ao adicionar dispositivo:', err.message);
      return res.status(500).json({ error: 'Erro ao adicionar dispositivo' });
    }
    res.status(201).json({ message: 'Dispositivo adicionado com sucesso' });
  });
});

router.get('/test', (req, res) => {
  res.json({ message: 'Rota funcionando!' });
});

module.exports = router;
