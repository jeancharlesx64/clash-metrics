const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.get('/', async function(req,res){
    if (req.session.authenticated) {

        const user = req.session.user;

        const player = await userController.getPlayerDataAPI(req.session.userGamertag);
        
        player.clanBadge =  await userController.getClanBadge(player.clan.badgeId);

        res.render('chat', {
            userId: user.session_userId,
            userName: user.session_userName,
            userEmail: user.session_userEmail,
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