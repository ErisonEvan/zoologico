const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  nome: String,
  especie: String,
  habitat: String,
  paisOrigem: String,
});

module.exports = mongoose.model('Animal', animalSchema);
