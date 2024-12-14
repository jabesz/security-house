const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/plans', (req, res) => {
  const query = 'SELECT * FROM plans';
db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar planos:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar planos' });
    }
    res.json(results);
  });
});

router.post('/plans', (req, res) => {
  const { user_id, plan_name, price } = req.body;
  if (!user_id || !plan_name || !price) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  const query = 'INSERT INTO plans (user_id, plan_name, price) VALUES (?, ?, ?)';
  db.query(query, [user_id, plan_name, price], (err) => {
    if (err) {
      console.error('Erro ao adicionar plano:', err.message);
      return res.status(500).json({ error: 'Erro ao adicionar plano' });
    }
    res.status(201).json({ message: 'Plano adicionado com sucesso' });
  });
});

module.exports = router;
