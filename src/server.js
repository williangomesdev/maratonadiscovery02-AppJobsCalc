//Criar servidor node
//Criar pasta src
//Criar arquivo server.js
//Começar estrutura
//Npm = gerenciar pacotes no node , libary, dependencias,framework

//0 = iniciando projeto
//0 = no terminal = npm init -y
//0 = criado o arquivo package.json = Informações sobre seu projeto, configurações do seu projeto
//0 = baixar o pacote express
//0 = no terminal = npm i express

//node_modules = adiciona todas as pastar de modulos do node, dentro dele podemos ver as dependencias dos pacotes
//require = função, pedindo algo
//capturar em uma varivel

//1 = pegar express e colocar em uma varivel
//1 = express é um parametro que colocamos na função
const express = require("express")
//2 = excutar o express em outra varivel
const server = express()
//=============================================================================================================================== = 2
//10 = voltamos do routes.js = adicionamos uma variavel para receber as rotas(importando)
const routes = require("./routes")



//9 = Vamos usar uma função para criar essas rotas automaticamente
//9 = use() = antes do express entrar na funçaõ server.get(), vamos hebilitar um novo  paramentro no express usando a função use
//9 = express.static() = aqui adicionamos a pasta publica que vamos usar na função use()

//Template Engines
//1 = setar o motor de visualização seje o ejs. o ejs vai fazer o processamento do html analisando dentro do contexto <% %> o javascript, e depois entregando o html puro
server.set("view engine","ejs")
//Template Engines
//2 = trocar todos os arquivos com extensão html para ejs

//Template Engines
//3 = baixar extensão para ajudar no ejs(facultativo)

//Template Engines
//4 = mudar a maneira que envia os arquivos(ir para routes.js)
//=============================================================================================================================== = (Template engines)1







//=============================================================================================================================== = 3
//10 = agora vamos as rotas que nos requisitamos adicionanado como um parametro use()
server.use(routes)

server.use(express.static("public"))

//10 = Agora temos que criar rotas para as outras paginas(temos que fazer manualmente)
//10 = dentro de src vamos criar uo arquivo de rotas (routes.js) = continuamos la no arquivo
//=============================================================================================================================== = 1

//4= quando acessar o servidor e ver o metodo get / execute a função
//4 = request(pedir), resposnse(resposta) =  são parametros que vamos usar na função

//server.get('/', (request, response) => {

    //6 = Terminar a função(precisa receber resposta) = return
    //4 = response.send = send envia alguma coisa

    //return response.send("3 = OI!");

    //8 = sendFile() = enviará um arquivo, colocamos o caminho par ao nosso servidor buscar e servir
    //para rastraemos o arquivo temos que deixar o arquivo em um caminho absoluto(consultar o caminho com o console.lo(__dirname))
    //8 = Vamos criar um diretório dento da pasta src com o nome de views, jogar tudo aquilo que o cliente for visualizar(html)
    //8 = Agora concatenamos o dirname(que será o nosso  caminho absoluto), junto com a pasta views(onde estão os nossos arquivos html) e retornaremos na função sendFile

    //return response.sendFile(__dirname+"/views/index.html")

    //9 = Public directory, arquivos que fazem parte do html para ter um bom funcionamento(CSS, javascript, etc...(são arquivos que não tem muitas mudanças conforme o preocesso(arquos estaticos)))
    //9 = Precisamos estabelecer rotas para que esses arquivos sejem também entregues ao cliente
    //9 = Como normalmente usamos varios arquivos no nosso projeto, a função express tem uma maneira para automatizar a criação dessas rotas
    //9 = Criar uma pasta para armazenar esses arquivos (/public), e vamos adicionar arquivos de imagem e CSS
//})

//5 = precisa desligar o servidor (CRL + C no terminal)_

//7=Baixar o nodemon(serve para não ficarmos desligando e ligando o servidor toda vez que alteramos algo)
//7= no terminal = npm i nodemon -D(Dependencia de desenvolvimento = somente quando estou desenvolvendo será utilizado)
//7 = Acessar o arquivo package.json e modificar a seguinte linha("scripts":{"dev":"nodemon ."})= nodemon irá fazer referencia a ser usado com o ("main":"src/server.js")
//7 = no terminal = npm run dev (rodar o script dev que configuramos no package.js)

//8 = Agora temos que encaminhar(mostrar) o caminho para nossas paginas html

//Propiedades
//3= Listen = ligar o servidor ouvir requerimento da porta
//3= 3000 = porta do servidor
server.listen(3000, function () {
    console.log("rodando")
})

//A partir desse momento ja temos nosso servidor//

//Template Engines
//Rodar códigos javascript dentro do html
//Configurar
//1 = terminal fazer o comando = npm i ejs
