# My Next Read - O que ler agora?

Quem nunca terminou de ler um livro e ficou na dúvida do que ler em seguida não é mesmoo?

Enão utilize o My Nex Read para saber o que você pode ler agora que tem haver com seus gostos literários!

<p align="center"><img src="doc/images/image_1.png" width="700px"></p>

### Principais Tecniologias/Ferramentas

- Google GenerativeAI - Gemini API
- NodeJS
- Bootstrap
- HTML5


## Estratégias

Foi utilizado a estratégia de **Few-shot Chain-of-Thought Prompting** que consiste em uma combinação da técnica de Few Shot, onde se dá exemplos de entrada e de saída no pormpt, como também a técninca de Cadeia de pensamentos, ou seja, ensiar ao modelo como ele deve pensar para devolver uma resposta.

Induzi o modelo a identificar os gêneros literários mais presentes na lista e alguma outra caraterística como a quantidade de páginas. 

Além disso, no modelo de resposta pedi que ele retornasse em json, para poder tratar na saída e poder facilmente manipular cada passo da resposta no front.

Coloquei uma tag mark para as categorias de livros na resposta esperada e ele também identificou esse indicativo.

<p align="center">
    <img src="doc/images/prompt.png" width="700px">
</p>

## Resultados
<img src="doc/images/image_3.png" width="700px">
<img src="doc/images/image_2.png" width="700px">

## Faça você mesmo

### Pré requisitos

Apenas *git, nodejs e npm* instalado na máquina.

### Passo a passo

1. Clone o porjeto na sua pasta de preferência
    ```
    cd /home/minha-pasta/

    git clone https://github.com/marcosnunesmbs/mynextread.git

   cd mynexread
    ```	
2. Instale as dependências
    ```	
    npm install
    ```

3. Renomeie o arquivo .env_example para .env e inclua a API_KEY
    ```	
    API_KEY="XPTO"
    ```		

4. Inicie o servidor node
    ```
    npm run server
    ```
5. Acesse o projeto no seu navegador
    ```	
    http://localhost