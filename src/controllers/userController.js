var userModel = require('../models/userModel');

function login(req,res){
    var email = req.body.email;
    var senha = req.body.senha;
    
    userModel.autenticarLogin(email,senha).then((resultadoQuery)=>{
            console.log(resultadoQuery.success);
            if(resultadoQuery.success){
                req.session.authenticated = true

                // criando na sessão um "json", com os dados que foi pego do banco 
                req.session.user = {
                    session_userId: resultadoQuery.bd_userId,
                    session_userName: resultadoQuery.bd_userName,
                    session_userEmail: resultadoQuery.bd_userEmail
                };
                res.redirect('/dashboard')
            }else{
                req.session.authenticated = false
                req.session.hasError = true;
                req.session.errorMessage = 'Usuário ou senha incorreta. Tente novamente!'
                res.redirect('/login')
            }

        }
    );
    
}

module.exports = {
    login
}