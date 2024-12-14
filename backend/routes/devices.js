const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/devices', (req, res) => {
  const query = 'SELECT * FROM devices';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar dispositivos:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar dispositivos' });
    }
    res.json(results);
  });
});

router.post('/devices', (req, res) => {
  const { user_id, name, type, status } = req.body;
  if (!user_id || !name || !type || !status) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  const query = 'INSERT INTO devices (user_id, name, type, status) VALUES (?, ?, ?, ?)';
  db.query(query, [user_id, name, type, status], (err) => {
    if (err) {
      console.error('Erro ao adicionar dispositivo:', err.message);
      return res.status(500).json({ error: 'Erro ao adicionar dispositivo' });
    }
    res.status(201).json({ message: 'Dispositivo adicionado com sucesso' });
  });
});

router.put('/devices/:id', (req, res) => {
  const { id } = req.params;
  const { name, type, status } = req.body;
  const query = 'UPDATE devices SET name = ?, type = ?, status = ? WHERE id = ?';
  db.query(query, [name, type, status, id], (err) => {
    if (err) {
      console.error('Erro ao atualizar dispositivo:', err.message);
      return res.status(500).json({ error: 'Erro ao atualizar dispositivo' });
    }
    res.json({ message: 'Dispositivo atualizado com sucesso' });
  });
});

module.exports = router;
