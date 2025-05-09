const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');

router.get('/', async (req, res) => {
  const animais = await Animal.find();
  res.json(animais);
});

router.post('/', async (req, res) => {
  const novo = new Animal(req.body);
  await novo.save();
  res.status(201).json(novo);
});

router.get('/:id', async (req, res) => {
  const animal = await Animal.findById(req.params.id);
  res.json(animal);
});

router.put('/:id', async (req, res) => {
  const atualizado = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(atualizado);
});

router.delete('/:id', async (req, res) => {
  await Animal.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;

app.get('/animais', async (req, res) => {
  const { habitat, especie } = req.query;

  let query = {};
  if (habitat) query.habitat = habitat;
  if (especie) query.especie = especie;

  const animais = await Animal.find(query);
  res.json(animais);
});
