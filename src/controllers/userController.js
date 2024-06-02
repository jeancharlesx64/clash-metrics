var userModel = require('../models/userModel');
const axios = require('axios');
const { response } = require('express');
require('dotenv').config()
const fs = require('fs');
const path = require('path');

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
                    session_userProfile: resultQuery.bd_userProfile
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
async function updateProfile(req, res){

    let profilePicture = req.body.oldProfile;
    
    let filepath = path.join(__dirname, '../../public/upload/user', profilePicture);
    if(req.file){
        profilePicture = req.file.filename;
        filepath = path.join(__dirname, '../../public/upload/user', profilePicture);
    }

    const userid = req.body.userid;
    const username = req.body.username;
    const gamertag = req.body.gamertag;


    console.log(profilePicture);
    const isGamertagValidated = await validateGamertag(gamertag);

    if(!isGamertagValidated && !req.file){
        req.session.errorMessage = 'A nova gamertag não existe ou está inválida!';
        req.session.hasError = true;
        res.redirect('/feed');
        return false
    }else if(!isGamertagValidated){
        req.session.errorMessage = 'A nova gamertag não existe ou está inválida!';
        req.session.hasError = true;
        fs.unlink(filepath, (err) => {
            if (err) {
                console.error('Erro ao apagar o arquivo:', err);
            } else {
                console.log('Arquivo apagado:', filepath);
            }
        });
        res.redirect('/feed');
        return false

    }

    userModel.updateProfile(userid, username, gamertag, profilePicture);

    req.session.hasEdited = true;
    res.redirect('/feed');

    
}

async function createPost(req, res){
    const postPicture = req.file.filename;
    const filepath = path.join(__dirname, '../../public/upload/user', postPicture);

    const userid = req.body.userid;
    const description = req.body.description;

    if(description.length >= 80 || description.length == ''){
        fs.unlink(filepath, (err) => {
            if (err) {
                console.error('Erro ao apagar o arquivo:', err);
            } else {
                console.log('Arquivo apagado:', filepath);
            }
        });
        req.session.errorMessage = 'A descrição deve conter menos de 80 caracteres! Seja breve';
        req.session.hasError = true;
        res.redirect('/feed');
        return false;
    }

    

    let response = userModel.createPost(userid, description, postPicture);
    
    console.log(response)
    if(response){
        req.session.hasCreated = true;
        res.redirect('/feed');
        return true;
    }else{
        req.session.hasError = false;
        req.session.errorMessage = 'Ocorreu algum erro ao criar sua postagem :('
        res.redirect('/feed');
        return false;
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

// Função para construir a URL completa da imagem do badge
async function getBadgeImageUrl(badgeId) {
    const badgeImageUrlBase = 'https://royaleapi.github.io/cr-api-assets/badges/';
    const imageName = await getBadgeImageName(badgeId);
    
}

// Função para obter o nome da imagem do badge pelo badgeId
async function getClanBadge(badgeId) {
    const badgeJsonUrl = 'https://royaleapi.github.io/cr-api-data/json/alliance_badges.json';
    const response = await axios.get(badgeJsonUrl);
    const badgesData = response.data;

    for (let i = 0; i < badgesData.length; i++) {
        if (badgesData[i].id === badgeId) {
            return badgesData[i].name;
        }
    }
    return null;
}

async function updateStatistic(userid, trophies, wins, losses, partymode){
    let response = await userModel.updateStatistic(userid, trophies, wins, losses, partymode);
    if(response){
        return true;
    }else{
        return false
    }
}

async function getProfileData(userid){
    const response = await userModel.getProfileData(userid)

    const userData = {
        userId: response[0].idUsuario,
        userName: response[0].usuario,
        userGamertag: response[0].gamertag,
        userProfile: response[0].fotoPerfil
    }
    return userData;
}


module.exports = {
    authLogin,
    validateGamertag,
    validateRegister,
    getPlayerDataAPI,
    getClanBadge,
    getBadgeImageUrl,
    updateStatistic,
    updateProfile,
    getProfileData,
    createPost
}