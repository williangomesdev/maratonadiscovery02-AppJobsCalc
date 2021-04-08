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

//=============================================================================================================================== = Aula2/3
const jobs = [{
    id: 1,
    name: "Pizzaria Guloso",
    "daily-hours": 2,
    "total-hours": 60,
    created_at: Date.now()
}, {
    id: 2,
    name: "OneTwo Project",
    "daily-hours": 3,
    "total-hours": 55,
    created_at: Date.now()
}]
//=============================================================================================================================== = Aula2/3

//11 = Encurtando a digitação das rotas
//11 = Arrow function => com uma linha não precisamos usar return
//=============================================================================================================================== = (Template engines)4
//4 = Antes entregavamos as paginas com html puro, agora vamos mudar para ele passar pelo motor(render) = ejs=================== = (Template engines)4
//Template engines
//5 = trocamos o sendFile = enviar por render = renderizar
//Aula2/4 = Adicionar o objeto jobs na index
routes.get('/', (req, res) => res.render(basePath + "index", {
    jobs
}))
routes.get('/job', (req, res) => res.render(basePath + "job"))
routes.post('/job', (req, res) => {
    //=============================================================================================================================== = Aula2/3
    //=============================================================================================================================== = Aula2/4
    //Aula2/4 = adicionar em uma classe o indice 0 do array a partir deste começaremos a contagem e adicionar os id's, adicionamos jobs.lenght para contar os elementos do array, contudo como 0 é contado como um elemento adicionamos -1 para recebermos o numero exato do array
    //Aula2/4 = no caso o array 0(não existe nada), se contarmos com -1 vai dar um valor inexistente, para contornarmos essa situação, vamos usar o comparador OU para 1 para começarmos a numerar os jobs 
    const lastId = jobs[jobs.length - 1] ? jobs[jobs.length - 1].id : 1;
    //=============================================================================================================================== = Aula2/4
    jobs.push({
        //=============================================================================================================================== = Aula2/4
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["totla-hours"],
        created_at: Date.now()
        //=============================================================================================================================== = Aula2/4
    })
    return res.redirect('/')
    //=============================================================================================================================== = Aula2/3
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
//Aula2/2 = quando mandamos a requisição temos varias informações que são enviadas, vamos Usar o req.body para pegarmos algumas informações(ir para o server.js)
//=============================================================================================================================== = Aula2/2
//Aula2/3 = Vamos criar um array com as informações que pegamos da pagina job(em routes.js)
//Aula2/3 = De inicio nosso array estará vazio, iremos adicionar as informações da pagina job de forma dinamica(em routes.js)
//Aula2/3 = jobs.push(adiciono informações da pagina dentro de um array, push = empurrar)
//Aula2/3 = return res.redirect('/')(o res retorna um redirecionamento para '/')
//=============================================================================================================================== = Aula2/3
//Aula2/4 = Vamos fazer a função de calculo de dias restantes
//Aula2/4 = Vamos adicionar informações que pegamos dentro de variaveis
//Aula2/4 = job.create_AT = Date.now() = estou atribuindo uma nova data para job
//Aula2/4 = Adicionar os parametros do array em jobs.push()
//Aula2/4 = Adicionar create_AT = Date.now() em jobs.push()
//Aula2/4 = Vamos criar uma maneira de adicionarmos uma id para cada job adicionado no app, vamos suar futuramente para gerenciar esse dado
//Aula2/4 = Vamos criar um forEach para automatizarmos a criação de cards(ir para index.ejs)

//10 = criamos uma funcionalidade get igual que temos no server.js e substituimos pela varivel routes
//routes.get('/', (req, res) => {
//    return res.sendFile(__dirname+"/views/index.html")
//})

//10 = Pegamos o objeto routes e jogamos para fora com o module.exports(exportando) = voltamos para o server.js
module.exports = routes;