const mongoose = require('mongoose');

const cuidadoSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  frequencia: String,
});

module.exports = mongoose.model('Cuidado', cuidadoSchema);
