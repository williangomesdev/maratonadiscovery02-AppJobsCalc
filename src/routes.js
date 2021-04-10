//10 = pegamos a função express
const express = require("express");
//10 = criamos uma varivel para receber o objeto express
//10 = Router() = função dentro do express
const routes = express.Router();

//11 = Maneira de encurtar a digitação das rotas
//11 = Criar variavel que ira armazenar informações em comum nas rotas

const basePath = __dirname + "/views/"

//=============================================================================================================================== = Aula2/10

//Editar profile dinamicamente

const Profile = {
    data: {
        "name": "Willian",
        "avatar": "https://github.com/williangomesdev.png",
        "monthly-budget": 3000,
        "hours-per-day": 5,
        "days-per-week": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    controllers: {
        index(req, res) {
            res.render(basePath + "profile", {
                profile: Profile.data
            })
        },
        //Update = Calculo de custo de horas, pegar algumas informaçoes do  Profile.data
        update(req, res) {
            //req.body para pegar os dados
            const data = req.body
            //definir quantas emana s tem no ano  
            const weeksPerYear = 52
            //remover as semanas de ferias do ano, para pegar quantas semanas tem em um mes
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
            //Total de horas trabalhadas por semana
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
            //Total de horas trabalhadas por mês
            const monthlyTotalHours = weekTotalHours * weeksPerMonth
            //Qual será p valor aminha hora
            const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }
            return res.redirect('/profile')
        }
    }
}
//=============================================================================================================================== = Aula2/10

//=============================================================================================================================== = Aula2/9
//Object literals = ja adiciona as suas propiedades
//Controllers =  controlar as funçoes de dentro do objeto
const Job = {
    data: [
        //=============================================================================================================================== = Aula2/3
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 1,
            created_at: Date.now()
        },
        {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 55,
            created_at: Date.now()
        }

        //=============================================================================================================================== = Aula2/3
    ],
    controllers: {
        index(req, res) {


            //Aula2/5 = Criar um novo array atualizado de jobs
            const updatedJobs = Job.data.map((job) => {

                const remaining = Job.services.remainingDays(job)
                //If ternario = se remaining for < = 0  (?)faça (:)senão faça
                const status = remaining <= 0 ? 'done' : 'progress'


                //Espalhamento = ...(pegue tudo que tenha no objeto e coloque aqui dentro)
                return {
                    ...job,
                    remaining,
                    status,
                    //Aula2/6 = Caluculo do custo do projeto
                    budget: Profile.data["value-hour"] * job["total-hours"]
                }
            })

            //Informações que serão retornadas no HTML
            return res.render(basePath + "index", {
                jobs: updatedJobs
            })
        },
        create(req, res) {
            return res.render(basePath + "job")
        },
        save(req, res) {
            //Aula2/4 = Adicionar o objeto jobs na index
            //=============================================================================================================================== = Aula2/3
            //=============================================================================================================================== = Aula2/4
            //Aula2/4 = adicionar em uma classe o indice 0 do array a partir deste começaremos a contagem e adicionar os id's, adicionamos jobs.lenght para contar os elementos do array, contudo como 0 é contado como um elemento adicionamos -1 para recebermos o numero exato do array
            //Aula2/4 = no caso o array 0(não existe nada), se contarmos com -1 vai dar um valor inexistente, para contornarmos essa situação, vamos usar o comparador OU para 1 para começarmos a numerar os jobs 
            const lastId = Job.data[Job.data.length - 1] ? Job.data[Job.data.length - 1].id : 1;
            //=============================================================================================================================== = Aula2/4
            Job.data.push({
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
        },

    },
    services: {
        //Aula2/5 = criar função de dias faltantes
        remainingDays(job) {
            //Aula2/5= Ajuste no job
            //Aula2/5= Calculo de tempo restante, remaningDays(dias restantes para entrega do projeto)
            //Aula2/5= toFixed() = receber numeros inteiros "arredondar"
            const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();
            //Aula2/5= criar uma varivel que retorne um objeto que contenha a data de criação do projetos
            const createdDate = new Date(job.created_at)
            //Aula2/5= definir dia do vencimento do projetos
            const dueDay = createdDate.getDate() + Number(remainingDays)
            //Aula2/5= definir data do vencim   ento do projetos
            const dueDateInMs = createdDate.setDate(dueDay)
            //Aula2/5= Retirar  da data futura os dias que temos a partir de hoje
            const timeDiffInMs = dueDateInMs - Date.now()
            //Aula2/5= Transformar Ms em dias
            const dayInMs = 1000 * 60 * 60 * 24
            //Aula2/5= Math.floor = arredondando para baixo
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
            //X dias faltantes
            return dayDiff

        }
    }
}
//=============================================================================================================================== = Aula2/9
//11 = Encurtando a digitação das rotas
//11 = Arrow function => com uma linha não precisamos usar return
//=============================================================================================================================== = (Template engines)4
//4 = Antes entregavamos as paginas com html puro, agora vamos mudar para ele passar pelo motor(render) = ejs=================== = (Template engines)4
//Template engines
//5 = trocamos o sendFile = enviar por render = renderizar


//=============================================================================================================================== = Aula2/9

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
//=============================================================================================================================== = Aula2/9

routes.get('/job-edit', (req, res) => res.render(basePath + "job-edit"))
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)


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
//=============================================================================================================================== = Aula2/4
//Aula2/5 = Vamos criuar a função Remaining Caulculator, calcular quantos dias faltam para o dia da entrega do projeto
//=============================================================================================================================== = Aula2/5
//Aula 2/6 = Vamos criar a função para calclo valor hora
//=============================================================================================================================== = Aula2/6
//Aula 2/7 = Adicionar informações no HTML(ir para index.ejs)
//=============================================================================================================================== = Aula2/7
//Aula 2/8 = Adicionar uma entrada no jobs para prazo encerrado(ir para index.ejs)
//=============================================================================================================================== = Aula2/8
//Aula 2/9 = Refatorar jobs 
//=============================================================================================================================== = Aula2/9
//Aula 2/10 = Refatorar Profile 
//=============================================================================================================================== = Aula2/10
//10 = criamos uma funcionalidade get igual que temos no server.js e substituimos pela varivel routes
//routes.get('/', (req, res) => {
//    return res.sendFile(__dirname+"/views/index.html")
//})

//10 = Pegamos o objeto routes e jogamos para fora com o module.exports(exportando) = voltamos para o server.js
module.exports = routes;