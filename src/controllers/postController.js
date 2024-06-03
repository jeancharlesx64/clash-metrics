var postModel = require('../models/postModel');
const uploadPost = require('../middleware/uploadPost');
const { response } = require('express');
require('dotenv').config()
const fs = require('fs');
const path = require('path');

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

    

    let response = postModel.createPost(userid, description, postPicture);
    
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

async function getPosts(){
    const posts = await postModel.getPosts();

    return posts;
}

async function getUserPosts(userId){
    const userPosts = await postModel.getUserPosts(userId);

    return userPosts
}
module.exports = {
    createPost,
    getPosts,
    getUserPosts
}