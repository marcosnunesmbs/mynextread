const express = require('express');
const app = express();
const path = require('path');
const GenerativeAI = require('./src/genai');
const { sugestMeBooks } = require('./src/services');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const generativeAI = new GenerativeAI();

// Rota para servir a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/what-my-nex', async (req, res) => {
    if (!req.body) {
        return res.status(400).send('Livros não fornecidos.');
    }

    try {
        // Chamar a função generateText com o prompt fornecido
        const data = await sugestMeBooks(generativeAI, req.body);

        // Enviar o texto gerado como resposta
        res.send({ data });
    } catch (error) {
        console.error('Erro ao gerar texto:', error);
        res.status(500).send('Erro ao gerar texto com o modelo generative-ai.');
    }
});

// Inicializa o servidor
const PORT = process.env.PORT || 80;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});