const express = require('express');
const router = express.Router();
const Cuidado = require('../models/Cuidado');

router.get('/', async (req, res) => {
  const cuidados = await Cuidado.find();
  res.json(cuidados);
});

router.post('/', async (req, res) => {
  const novo = new Cuidado(req.body);
  await novo.save();
  res.status(201).json(novo);
});

router.get('/:id', async (req, res) => {
  const cuidado = await Cuidado.findById(req.params.id);
  res.json(cuidado);
});

router.put('/:id', async (req, res) => {
  const atualizado = await Cuidado.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(atualizado);
});

router.delete('/:id', async (req, res) => {
  await Cuidado.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
