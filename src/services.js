async function sugestMeBooks(generativeAI, books) {
    try {
        const response = generativeAI.sugestBooks(books)
        return response;
    } catch (error) {
        console.error('Erro ao gerar texto com o modelo generative-ai:', error);
        return null;
    }
}
async function sugestMeMovies(generativeAI, movies) {
    try {
        const response = generativeAI.sugestMovies(movies)
        return response;
    } catch (error) {
        console.error('Erro ao gerar texto com o modelo generative-ai:', error);
        return null;
    }
}

module.exports = { sugestMeBooks, sugestMeMovies };