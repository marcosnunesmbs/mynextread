const { GoogleGenerativeAI } = require("@google/generative-ai");

class GenerativeAI {
    constructor() {
        this.model = null;
        this.initializeModel();
        this.settings = {
            temperature: 1,
            topK: 0,
            topP: 0.95,
            maxOutputTokens: 8192,
            response_mime_type: "application/json",
          };
    }

    async initializeModel() {
        try {
            const model = new GoogleGenerativeAI(process.env.API_KEY);
            this.model = model.getGenerativeModel({ model: "gemini-1.5-pro-latest", 'generationConfig': this.settings});
            console.log('Gemini inicializado com sucesso!');
        } catch (error) {
            console.error('Erro ao inicializar o modelo:', error);
        }
    }

    async sugestBooks(books) {
        if (!this.model) {
            console.error('Modelo generative-ai não inicializado. Certifique-se de chamar o construtor.');
            return null;
        }
        try {
            const prompt = `Pergunta: 
            Os últimos Cinco livros que li e gostei muito foram:
            - Harry Potter (J. K. Rolwling)
            - O Senhor dos Aneis (R. R. Tolkien)
            - Silo (Hugh Howey)
            - O Problema dos 3 Corpos (Cixin Liu)
            - O guia do muchileiro das Galáxias (Douglas Adams)
            
            Raciocínio:
            Os gostos literários de preferência são de Ficção Científica e Fantasia, são livros best-sellers e com quantidade de páginas alta.
            
            Resposta em json: { "annotations" : "Percebi que gosta mutio de  <mark>Ficção Científica e Fantasia </mark>, best-sellers e gosta de ler mutias páginas. Recomendação de próxima leitura:",    "suggestions": [        { "book": "Crônicas de Nárnia (C.S. Lewis)",        "description": "Esta série clássica apresenta uma jornada mágica através de um mundo encantado, semelhante à atmosfera de Harry Potter e O Senhor dos Anéis."        },        { "book": "Mundo em Caos (Patrick Ness)",        "description": "Uma série de ficção científica envolvente que inclui aventura, suspense e personagens cativantes, semelhante ao ritmo empolgante de 'Silo'."        },        { "book": "Fundação (Isaac Asimov)",        "description": "Uma série de ficção científica clássica que aborda conceitos profundos sobre civilizações e futuro da humanidade, semelhante ao pensamento especulativo de 'O Problema dos 3 Corpos'."        }    ]}
            
            Pergunta:
            Os últimos Cinco livros que li e gostei muito foram:
            - ${books['book1']}
            - ${books['book2']}
            - ${books['book3']}
            - ${books['book4']}
            - ${books['book5']}
            Resposta em json:`;
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            return text
        } catch (error) {
            console.error('Erro ao gerar texto com o modelo generative-ai:', error);
            return null;
        }
    }
}

module.exports = GenerativeAI;