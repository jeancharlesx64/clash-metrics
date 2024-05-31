const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.get('/', async function(req,res){
    if (req.session.authenticated) {

        const user = req.session.user;

        const player = await userController.getPlayerDataAPI(req.session.userGamertag);

        // atualizando o perfil
        let profileData = await userController.getProfileData(user.session_userId);

        res.render('chat', {
            userId: user.session_userId,
            userEmail: user.session_userEmail,
            userName: profileData.userName,
            userProfile: profileData.userProfile,
            player: player,
            currentDeck: player.currentDeck
        });


    }else{
        req.session.hasErrorLogin = true;
        req.session.errorMessageLogin = 'Faça login antes de acessar o chat!';
        console.log(req.session.errorMessageLogin)
        
        res.redirect('/login');
    }

})

module.exports = router;