//10 = pegamos a função express
const express = require("express");
//10 = criamos uma varivel para receber o objeto express
//10 = Router() = função dentro do express
const routes = express.Router();

//11 = Maneira de encurtar a digitação das rotas
//11 = Criar variavel que ira armazenar informações em comum nas rotas

const basePath = __dirname + "/views/"

//Editar profile dinamicamente
const profile = {
    "name": "Willian",
    "avatar": "https://github.com/williangomesdev.png",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4
}

//11 = Encurtando a digitação das rotas
//11 = Arrow function => com uma linha não precisamos usar return
//=============================================================================================================================== = (Template engines)4
//4 = Antes entregavamos as paginas com html puro, agora vamos mudar para ele passar pelo motor(render) = ejs=================== = (Template engines)4
//Template engines
//5 = trocamos o sendFile = enviar por render = renderizar
routes.get('/', (req, res) => res.render(basePath + "index"))
routes.get('/job', (req, res) => res.render(basePath + "job"))
routes.post('/job', (req, res) => {
    console.log('salvar dados')
})
routes.get('/job-edit', (req, res) => res.render(basePath + "job-edit"))
routes.get('/profile', (req, res) => res.render(basePath + "profile", {
    profile
}))

//12 = Agora temos que ir no html fazer a correção das rotas(vamos apra paginas html)
//=============================================================================================================================== = 1

//Aula2/0 = package.json, caso baixemos o projeto para edição, a pasta node_modules não existira, mas neste arquivo terá todas as dependencias que precisamos
//Aula2/0 = no caso se precisamos das dependencias, fazemos o seguinte comando no terminal, npm i, ele irá ler o arquivo de pacotes e instalara as dependencias
//Aula2/1 = Criaremos uma rota para o metodo POST para o form da pagina (vamos para a pagina job)

//10 = criamos uma funcionalidade get igual que temos no server.js e substituimos pela varivel routes
//routes.get('/', (req, res) => {
//    return res.sendFile(__dirname+"/views/index.html")
//})

//10 = Pegamos o objeto routes e jogamos para fora com o module.exports(exportando) = voltamos para o server.js
module.exports = routes;