const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.log('Erro ao conectar ao MongoDB:', err));

// Defina as rotas aqui (exemplo para /animais)
app.get('/animais', (req, res) => {
  res.json([{ nome: 'Leão' }, { nome: 'Elefante' }]); // Exemplo estático
});

app.post('/animais', (req, res) => {
  // Aqui você pode adicionar lógica para salvar no banco de dados
  res.status(201).json({ message: 'Animal criado com sucesso' });
});

// Defina a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Atualizar um animal
app.put('/animais/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, dataNascimento, especie, habitat, paisOrigem } = req.body;
  
  try {
    const animalAtualizado = await Animal.findByIdAndUpdate(id, {
      nome,
      descricao,
      dataNascimento,
      especie,
      habitat,
      paisOrigem
    }, { new: true });
    
    res.json(animalAtualizado);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar o animal' });
  }
});

// Atualizar um cuidado
app.put('/cuidados/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, frequencia } = req.body;

  try {
    const cuidadoAtualizado = await Cuidado.findByIdAndUpdate(id, {
      nome,
      descricao,
      frequencia
    }, { new: true });

    res.json(cuidadoAtualizado);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar o cuidado' });
  }
});

// Excluir um animal
app.delete('/animais/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await Animal.findByIdAndDelete(id);
    res.status(200).json({ message: 'Animal excluído com sucesso' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao excluir o animal' });
  }
});

// Excluir um cuidado
app.delete('/cuidados/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Cuidado.findByIdAndDelete(id);
    res.status(200).json({ message: 'Cuidado excluído com sucesso' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao excluir o cuidado' });
  }
});
