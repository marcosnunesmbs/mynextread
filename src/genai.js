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
            this.model = model.getGenerativeModel({ model: "gemini-2.0-flash", 'generationConfig': this.settings});
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
            
            Resposta em html: <p>Percebi que gosta mutio de  <mark>Ficção Científica e Fantasia </mark>, best-sellers e gosta de ler mutias páginas. Recomendação de próxima leitura:</p><p><strong>"Crônicas de Nárnia (C.S. Lewis)"</strong></p><p>Esta série clássica apresenta uma jornada mágica através de um mundo encantado, semelhante à atmosfera de Harry Potter e O Senhor dos Anéis.</p><p><strong>Mundo em Caos (Patrick Ness)<strong></p><p>Uma série de ficção científica envolvente que inclui aventura, suspense e personagens cativantes, semelhante ao ritmo empolgante de 'Silo'.</p><p><strong>Fundação (Isaac Asimov)</strong></p><p>Uma série de ficção científica clássica que aborda conceitos profundos sobre civilizações e futuro da humanidade, semelhante ao pensamento especulativo de 'O Problema dos 3 Corpos'.</p>   
            Pergunta:
            Os últimos Cinco livros que li e gostei muito foram:
            - ${books['book1']}
            - ${books['book2']}
            - ${books['book3']}
            - ${books['book4']}
            - ${books['book5']}
            Resposta: em html`;
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            return text
        } catch (error) {
            console.error('Erro ao gerar texto com o modelo generative-ai:', error);
            return null;
        }
    }

    async sugestMovies(movies) {
        if (!this.model) {
            console.error('Modelo generative-ai não inicializado. Certifique-se de chamar o construtor.');
            return null;
        }
        try {
            const prompt = `Pergunta: 
            Os últimos Cinco filmes que assisti e gostei muito foram:
            - It - a coisa
            - O quarto de jack
            - A garota dinamarqueza
            - Como eu era antes de você
            - O chamado
            
            Raciocínio:
            O gosto de filme parece ser de terror, superação e romance, não tem medo de levar susto e gosta de histórias impactantes.
            
            Resposta em html: <p>Percebi que gosta mutio de filmes de <mark>terror, superação e romance</mark>, grandes histórias e não tem medo de um susto. Aqui vão três recomendações para assitir agora:</p><p><strong>Hereditário (2018)</strong></p><p>Se você gostou de "O Chamado", poderá apreciar "Hereditário". Este filme é um suspense psicológico e sobrenatural que envolve uma família lidando com eventos perturbadores após a morte da avó. Assim como "O Chamado", "Hereditário" explora o horror que se desenrola lentamente e cria uma atmosfera sinistra.</p><p><strong>Fragmentado (2016)</strong></p><p>Para quem gostou de "O Quarto de Jack", "Fragmentado" pode ser uma boa escolha. Este filme de suspense psicológico dirigido por M. Night Shyamalan envolve um homem com múltiplas personalidades que sequestra três adolescentes. Assim como em "O Quarto de Jack", há uma forte ênfase nos personagens e nas tensões psicológicas.</p><p><strong>Cisne Negro (2010)</strong></p><p>Se você gostou de "A Garota Dinamarquesa", poderá apreciar "Cisne Negro". Este é um thriller psicológico que segue a vida de uma bailarina que lida com pressões intensas no mundo da dança, ao mesmo tempo em que enfrenta seus próprios demônios internos. Assim como "A Garota Dinamarquesa", "Cisne Negro" aborda questões profundas relacionadas à identidade e à busca pela autenticidade.</p>
            
            Pergunta:
            Os últimos Cinco filmes que assisti e gostei muito foram:
            - ${movies["movie1"]}
            - ${movies["movie2"]}
            - ${movies["movie3"]}
            - ${movies["movie4"]}
            - ${movies["movie5"]}
            Resposta em html:`;
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