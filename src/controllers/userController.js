var userModel = require('../models/userModel');
const axios = require('axios');
require('dotenv').config()

function authLogin(req,res){
    var email = req.body.email;
    var password = req.body.password;
    
    userModel.login(email,password).then((resultQuery)=>{
            console.log(resultQuery.success);
            if(resultQuery.success){
                req.session.authenticated = true
                req.session.userGamertag = resultQuery.bd_userGamertag;

                // criando na sessão um "json", com os dados que foi pego do banco 
                req.session.user = {
                    session_userId: resultQuery.bd_userId,
                    session_userName: resultQuery.bd_userName,
                    session_userEmail: resultQuery.bd_userEmail,
                };

                console.log(req.session.userGamertag);

                res.redirect('/dashboard');
            }else{
                req.session.authenticated = false
                req.session.hasErrorLogin = true;
                req.session.errorMessageLogin = 'Usuário ou senha incorreta. Tente novamente!'
                res.redirect('/login')
            }

        }
    );
    
}

async function validateRegister(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const gamertag = req.body.gamertag;


    const isGamertagValidated = await validateGamertag(gamertag);
    const isEmailValidated = await validateEmail(email);

    if (isGamertagValidated && isEmailValidated) {
        userModel.register(username, email, password, gamertag).then(function(result){
            console.log(result.success);
    
            // verificamos se o success é TRUE, se for true, então 
            if(result.success){
                req.session.hasRegistered = true
                res.redirect('/login')
            }else{ // senão
                req.session.hasRegistered = false
                console.log('Algum erro ocorreu ao cadastrar teste')
                res.redirect('/register')
            }
    
        })
    } else {
        req.session.hasErrorRegister = true;
        req.session.errorMessageRegister = 'Gamertag não encontrada. Tente novamente!'

        if(!isEmailValidated){
            req.session.errorMessageRegister = 'Email já registrado. Tente outro!'
        }
        res.redirect('/register');
    }
}

async function validateGamertag(gamertag) {
    try {
        const apiKey = process.env.API_KEY;
        const apiUrl = 'https://proxy.royaleapi.dev/v1/players/%23' + gamertag.replace('#', '');
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': 'Bearer ' + apiKey
            }
        });
        return true;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return false;
        } else {
            console.log('Ocorreu algum erro ao validar a gamertag: ' + error);
            return false;
        }
    }
}

async function validateEmail(email){
    const resultadoQuery = await userModel.getEmail(email);
    console.log(resultadoQuery.success);
    if(resultadoQuery.success){
        if(resultadoQuery.isThereEmail){
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

async function getPlayerDataAPI(gamertag) {
    const apiKey = process.env.API_KEY;
    const apiUrl = 'https://proxy.royaleapi.dev/v1/players/%23' + gamertag.replace('#', '');
    const response = await axios.get(apiUrl, {
        headers: {
            'Authorization': 'Bearer ' + apiKey
        }
    });
    return response.data;
}
module.exports = {
    authLogin,
    validateGamertag,
    validateRegister,
    getPlayerDataAPI
}