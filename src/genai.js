const { GoogleGenerativeAI } = require("@google/generative-ai");

class GenerativeAI {
    constructor() {
        this.model = null;
        this.initializeModel();
        this.settings = {
            candidate_count: 1,
            temperature: 1,
          };
    }

    async initializeModel() {
        try {
            console.log(process.env.API_KEY)
            const model = new GoogleGenerativeAI(process.env.API_KEY);
            // Instanciar o modelo generative-ai
            this.model = model.getGenerativeModel({ model: "gemini-pro", 'generationConfig': this.settings});
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
            console.log(books)
            const prompt = `Pergunta: 
            Os últimos Cinco livros que li e gostei muito foram:
            - Harry Potter (J. K. Rolwling)
            - O Senhor dos Aneis (R. R. Tolkien)
            - Silo (Hugh Howey)
            - O Problema dos 3 Corpos (Cixin Liu)
            - O guia do muchileiro das Galáxias (Douglas Adams)
            
            Raciocínio:
            Os gostos literários de preferência são de Ficção Científica e Fantasia, são livros best-sellers e com quantidade de páginas alta.
            
            Resposta: Percebi que gosta mutio de Ficção Científica e Fantasia, best-sellers e gosta de ler mutias páginas. Recomendação de próxima leitura: 
            1 - Crônicas de Nárnia (C.S. Lewis) - Esta série clássica apresenta uma jornada mágica através de um mundo encantado, semelhante à atmosfera de Harry Potter e O Senhor dos Anéis.
            2 - Mundo em Caos (Patrick Ness) - Uma série de ficção científica envolvente que inclui aventura, suspense e personagens cativantes, semelhante ao ritmo empolgante de "Silo".
            3 - Fundação (Isaac Asimov) - Uma série de ficção científica clássica que aborda conceitos profundos sobre civilizações e futuro da humanidade, semelhante ao pensamento especulativo de "O Problema dos 3 Corpos".
            
            Pergunta:
            Os últimos Cinco livros que li e gostei muito foram:
            - ${books['book1']}
            - ${books['book2']}
            - ${books['book3']}
            - ${books['book4']}
            - ${books['book5']}
            Resposta:`;
            console.log(prompt)
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            return text;
        } catch (error) {
            console.error('Erro ao gerar texto com o modelo generative-ai:', error);
            return null;
        }
    }
}

module.exports = GenerativeAI;