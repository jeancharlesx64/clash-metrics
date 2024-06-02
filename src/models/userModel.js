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
                console.log(resultadoQuery)
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

async function register(username, email, password, gamertag){

    try {
        var sqlCommand = `
            INSERT INTO usuario(idUsuario, usuario, email, senha, gamertag, dataCriacao) VALUE
                (DEFAULT, "${username}", "${email}", "${password}", "${gamertag}", NOW());
        `;

        let userData = await database.execute(sqlCommand);
        
        let newSqlCommand = `
            INSERT INTO estatistica VALUE
            (DEFAULT, NULL, NULL, NULL, NULL, ${userData.insertId});
        `;
    
        await database.execute(newSqlCommand);
        
        return { 
            success: true,
            message: 'Cadastrado com sucesso!' 
        };
    } catch(error) {
        console.error('Erro ao cadastrar:', error);
        
        return { 
            success: false,
            message: 'Ocorreu um erro durante o cadastro, verifique a instrução SQL' 
        };
    }
    // var sqlCommand = `
    //     INSERT INTO usuario(idUsuario, usuario, email, senha, gamertag, dataCriacao) VALUE
    //         (DEFAULT, "${username}", "${email}", "${password}", "${gamertag}", NOW());
    // `;

    // console.log("Executando a instrução SQL: \n" + sqlCommand);
    // return database.execute(sqlCommand).then(() => { 
    //     return { 
    //         success: true,
    //         message: 'Cadastrado com sucesso!' 
        
    //     };
    // })
    // .catch(error => {
    //     console.error('Erro ao cadastrar:', error);
    //     return { 
    //         success: false,
    //         message: 'Ocorreu um erro durante o cadastro, verifique a intrução SQL' 
        
    //     };
    // });;
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

function updateProfile(userid, username, gamertag, profilePicture){
    console.log("UserModel acessado > função:updateTrophies");

    var sqlCommand = ''

    sqlCommand = `
        UPDATE usuario
        SET usuario = '${username}'
        WHERE idUsuario = ${userid};
    `;
    database.execute(sqlCommand);
    
    sqlCommand = `
        UPDATE usuario
        SET gamertag = '${gamertag}'
        WHERE idUsuario = ${userid};
    `
    database.execute(sqlCommand);

    sqlCommand = `   
        UPDATE usuario
        SET fotoPerfil = '${profilePicture}'
        WHERE idUsuario = ${userid};
    `
    database.execute(sqlCommand);
}

function getProfileData(userid){
    console.log("UserModel acessado > function:getProfilePicture");

    var sqlCommand = `
        SELECT idUsuario, usuario, gamertag, fotoPerfil FROM usuario WHERE idUsuario = "${userid}";
    `;

    console.log("Executando a instrução SQL: \n" + sqlCommand);

    return database.execute(sqlCommand);
      
}

function updateStatistic(userid, trophies, wins, losses, partymode){
    console.log("UserModel acessado > função:updateStatistic");

    try{
        var sqlCommand = ''
    
        sqlCommand = `
            UPDATE estatistica
            SET trofeus = ${trophies}
            WHERE fkUsuario = ${userid};
        `;
        database.execute(sqlCommand);
    
        sqlCommand = `
            UPDATE estatistica
            SET vitorias = ${wins}
            WHERE fkUsuario = ${userid};
        `;
        database.execute(sqlCommand);
        
        sqlCommand = `
            UPDATE estatistica
            SET derrotas = ${losses}
            WHERE fkUsuario = ${userid};
        `
        database.execute(sqlCommand);
    
        sqlCommand = `   
            UPDATE estatistica
            SET partyMode = ${partymode}
            WHERE fkUsuario = ${userid};
        `
        database.execute(sqlCommand);
        return true;

    }catch(e){
        console.log(e)
        return false;
    }
}

function createPost(userid, description, postPicture){
    
    try {
        var sqlCommand = `
            INSERT INTO post VALUE
                (DEFAULT, '${description}', '${postPicture}', NOW(), ${userid});
        `;

        database.execute(sqlCommand);
        
        return true;
    } catch(error) {
        console.error('Erro ao cadastrar:', error);
        
        return false;
    }
}
module.exports = {
    login,
    register,
    getEmail,
    updateStatistic,
    updateProfile,
    getProfileData,
    createPost
};