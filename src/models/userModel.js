var database = require('../configs/database/connection');

function login(email, senha) {
    console.log("User Model accessed > function autenticarLogin");

    var sqlCommand = `
        SELECT idUsuario, usuario, email FROM usuario WHERE email = "${email}" AND senha = "${senha}";
    `;
    console.log("Running SQL command: \n" + sqlCommand);

    return database.execute(sqlCommand).then(resultadoQuery => {
    
        if (resultadoQuery && resultadoQuery.length > 0) {
            // Se houver pelo menos um resultado, significa que o login foi bem-sucedido
            // Após o login bem-sucedido
            return {
                 success: true, 
                 bd_userId: resultadoQuery[0].idUsuario,
                 bd_userName: resultadoQuery[0].usuario,
                 bd_userEmail: resultadoQuery[0].email
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

module.exports = {
    login,
};