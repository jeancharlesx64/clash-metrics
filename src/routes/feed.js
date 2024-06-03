const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const uploadUser = require('../middleware/uploadProfile');
const uploadPost = require('../middleware/uploadPost');

// Rota raiz
router.get('/', async function(req, res) {    
    if (req.session.authenticated) {

        const user = req.session.user;

        const player = await userController.getPlayerDataAPI(req.session.userGamertag);
        
        let imgName = '';
        let imgUrl = '';

        if(player.clan){
           imgName =  await userController.getClanBadge(player.clan.badgeId);
           imgUrl = `https://royaleapi.github.io/cr-api-assets/badges/${imgName}.png`     
           player.clanName = player.clan.name;
           player.clanTag = player.clan.tag  ;     
        }else{
            imgUrl = `https://cdn.royaleapi.com/static/img/badge/no_clan.png?t=0b21d1b4c`
            player.clanName = 'Sem clã'
            player.clanTag = '#XXXXXXXX'
        }

        let errorMessage = '';
        let hasError = false;

        if(req.session.hasError){
            errorMessage = req.session.errorMessage;
            hasError = req.session.hasError;

            delete req.session.hasError;
            delete req.session.errorMessage;

            console.log(errorMessage);
        }

        let hasEdited = false;
        let hasCreated = false;

        if(req.session.hasEdited){
            hasEdited = req.session.hasEdited;
            delete req.session.hasEdited;
        }
        
        if(req.session.hasCreated){
            hasCreated = req.session.hasCreated;
            delete req.session.hasCreated;
        }
        
        // // atualizando o perfil
        let profileData = await userController.getProfileData(user.session_userId);

        
        let hasPost = false;
        let posts = {
            descricao: '',
            fotoPost: '',
            dataCriacao: '',
            usuario: {
              nome: '',
              gamertag: '',
              fotoPerfil: ''
            }
        }
    
        let hasUserPosts = false;
        let userPosts = {
            descricao: '',
            fotoPost: '',
            dataCriacao: ''
        }

        posts = await postController.getPosts();
        userPosts = await postController.getUserPosts(user.session_userId)

        if(posts.length > 0){
            hasPost = true;
        }
        if(userPosts.length > 0){
            hasUserPosts = true;
        }

        player.badgeUrl = imgUrl;
        res.render('feed', {
            userId: user.session_userId,
            userEmail: user.session_userEmail,
            userName: profileData.userName,
            userProfile: profileData.userProfile,
            player: player,
            hasError: hasError,
            errorMessage: errorMessage,
            hasEdited: hasEdited,
            hasCreated: hasCreated,
            hasPost: hasPost,
            posts: posts,
            hasUserPosts: hasUserPosts,
            userPosts: userPosts
        });

    }else{
        
        console.log(req.session.errorMessageLogin)
        
        res.redirect('/login');
    }

});

router.post('/editProfile', uploadUser.single('profilePicture'), function(req, res){
    userController.updateProfile(req,res);
})

router.post('/createPost', uploadPost.single('postPicture'), function(req, res){
    postController.createPost(req,res);
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.redirect('/feed'); // Redirecione de volta para o dashboard em caso de erro
        }
        res.clearCookie('connect.sid'); // Limpar o cookie de sessão
        res.redirect('/login'); // Redirecionar para a tela de login
    });
});


module.exports = router;