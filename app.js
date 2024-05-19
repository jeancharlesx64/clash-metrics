
// ======= MODULOES GERENCIADORES =======
const path = require('path'); // 
const cors = require('cors');
require('dotenv').config()  // requisitando o acesso á variáveis de ambiente
const session = require('express-session'); // utilizando os módulos de sessões 


// ========= EXPRESS SETUP ==============
const express = require('express'); // requisitando o acesso ao framework express
const app = express(); // utilizando o express
// =====================================

// ============ MIDDLEWARES =============
app.use(express.json()); // permite capturar arquivos JSON usaveis no "reqs", pra manipular nas rotas
app.use(express.urlencoded({ // permite as análise de dados vindo de formulários que vem codificado na URL por meio do HTTP (POST,PUT)
    extended: false // não permitindo requisições complexas ou extensas, para evitar DoS
})); 
app.use(express.static( // permite arquivos estáticos como CSS, JS, Imagens, dentro do diretório public
    path.join(__dirname, 'public') // faz a concatenação do caminho raiz do projeto + public
)); 
app.set('view engine', 'ejs');// Configura o Express para usar o mecanismo de template ejs
app.set('views', path.join(__dirname, 'src', 'views'));// Define o diretório onde estão os arquivos de visualização (views) usando template EJS 
app.use(cors()); // permitindo requisições HTTP -> CROSS ORIGIN RESOURCES SHARING
// =====================================

// ======== DEFINIÇÃO DE SESSÃO ========
app.use(session({
    secret: 'sptech', // chave """"""""""""""""""secreta""""""""""""""""""" pra evitar cross scripting
    resave: false,
    saveUninitialized: true
}));
// =====================================

// ======= DEFINIÇÃO DE ROTAS ==========
var indexRouter = require("./src/routes/index");
var dashboardRouter = require("./src/routes/dashboard");

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
// =====================================

// ========= ABRINDO SERVIDOR ==========
const HOST = process.env.SV_HOST;
const PORT = process.env.SV_PORT; 
const ENVIROMENT = process.env.NODE_ENV; 

try{
    app.listen(PORT, ()=>{  
        console.log(`Preparando o ambiente de \x1b[33m${ENVIROMENT}\x1b[0m...`)
        console.log(`\x1b[32mExecutando o servidor: http://${HOST}:${PORT} \x1b[0m`)
    })
}catch(e){
    console.log(`\x1b[31mErro ao inicializar o servidor:\x1b[0m\n${e}`) 
}
// ====================================

const database = require('./src/configs/database/connection');
database.execute('select * from usuario');
