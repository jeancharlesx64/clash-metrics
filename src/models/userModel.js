var database = require('../configs/database/connection');
const axios = require('axios');

function login(email, password) {
    console.log("UserModel acessado > função:login");

    var sqlCommand = `
        SELECT idUsuario, usuario, email, gamertag FROM usuario WHERE email = "${email}" AND senha = "${password}";
    `;
    console.log("Executando a instrução SQL: \n" + sqlCommand);

    return database.execute(sqlCommand).then(resultadoQuery => {
    
        if (resultadoQuery && resultadoQuery.length > 0) {
            // Se houver pelo menos um resultado, significa que o login foi bem-sucedido
            // Após o login bem-sucedido
            return {
                 success: true, 
                 bd_userId: resultadoQuery[0].idUsuario,
                 bd_userName: resultadoQuery[0].usuario,
                 bd_userEmail: resultadoQuery[0].email,
                 bd_userGamertag: resultadoQuery[0].gamertag
            };
        } else {
            // Se o resultado estiver vazio, significa que o login falhou
            return { 
                success: false,
                 message: 'Credenciais de login inválidas.' 
            };
        }
    })
    .catch(error => {
        // Se ocorrer um erro durante a execução da consulta SQL, capture e manipule-o aqui
        console.error('Erro ao autenticar login:', error);
        return { success: false, message: 'Ocorreu um erro durante a autenticação do login.' };
    });;
}

function register(username, email, password, gamertag){
    var sqlCommand = `
        INSERT INTO usuario(idUsuario, usuario, email, senha, gamertag, dataCriacao) VALUE
            (DEFAULT, "${username}", "${email}", "${password}", "${gamertag}", NOW());
    `;

    console.log("Executando a instrução SQL: \n" + sqlCommand);
    return database.execute(sqlCommand).then(() => { 
        return { 
            success: true,
            message: 'Cadastrado com sucesso!' 
        
        };
    })
    .catch(error => {
        console.error('Erro ao cadastrar:', error);
        return { 
            success: false,
            message: 'Ocorreu um erro durante o cadastro, verifique a intrução SQL' 
        
        };
    });;
}


function getEmail(email) {
    console.log("UserModel acessado > função:getEnaail");

    var sqlCommand = `
        SELECT idUsuario FROM usuario WHERE email = "${email}";
    `;
    console.log("Executando a instrução SQL: \n" + sqlCommand);

    return database.execute(sqlCommand).then(resultadoQuery => {
        if (resultadoQuery && resultadoQuery.length > 0) {
            // Se houver pelo menos um resultado
            return {
                 success: true, 
                 isThereEmail: true
            };
        } else {
            return {
                success: true, 
                isThereEmail: false
           };
        }
    })
    .catch(error => {
        // Se ocorrer um erro durante a execução da consulta SQL, capture e manipule-o aqui
        console.error('Erro ao autenticar o email no login:', error);
        return { success: false};
    });;
}
function updateTrophies(id,trophies){
    console.log("UserModel acessado > função:updateTrophies");

    var sqlCommand = `
        UPDATE usuario
        SET trophies = ${trophies}
        WHERE idUsuario = ${id}
    `;
    database.execute(sqlCommand);
}
module.exports = {
    login,
    register,
    getEmail,
    updateTrophies
};