// acesso a variaveis de ambiente
require('dotenv').config();

// requerindo o modulo do mysql2
const mysql = require('mysql2');

// instancia das configuração do mysql para conexão
const mysqlConfig = {
    host: process.env.DB_HOST, // servidor host
    user: process.env.DB_USER, // user do banco
    password: process.env.DB_PASSWORD, // senha do usuario
    database: process.env.DB_NAME, // banco selecionado
}

// principal função para executar uma intrução sql
function execute(sqlCommand){
    if (process.env.NODE_ENV == "development") {
        
        // se ambiente de desenvolvimento (usar o localhost, MySQL)
        return new Promise(function (resolve, reject) {
            var connection = mysql.createConnection(mysqlConfig); // faz uma instancia com as credenciais definida
            connection.connect(); // abre a conexão
            connection.query(sqlCommand, function (error, result) { // executa uma query com a instrução no "sql comand"
                connection.end(); // finaliza a conexão
                if (error) { // em caso de erro
                    reject(error); // quebre a promessa
                }
                console.log(result); // apresente o resultado 
                resolve(result); // solucione a promessa
            });

            // Captura eventos de error na conexão com o MySQL Workbench
            connection.on('error', function (error) {
                return (`\x1b[31m Some error happened MySQL (Workbench localhost):\n\x1b[0m ${error.sqlMessage}`);
            });
        });
    } else {
        // variáveis de ambiente deve ser setadas antes de conectar
        return new Promise(function (resolve, reject) {
            console.log(`\x1b[31m\nSet the NODE_ENV environment variable to 'production' or 'development' at .env file\n\x1b[0m`);
            reject("Environment variable not set in .env")
        });
    }
}


// exportando a função de executar comandos sql
module.exports = {
    execute
}