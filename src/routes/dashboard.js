const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

// Rota raiz
router.get('/', async function(req, res) {    
    if (req.session.authenticated) {

        const user = req.session.user;
        // atualizando o perfil
        let profileData = await userController.getProfileData(user.session_userId);

        const player = await userController.getPlayerDataAPI(profileData.userGamertag);
        
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
 
        player.badgeUrl = imgUrl;



        // atualizando os troféus
        let isTrophiesUpdated = await userController.getNewTrophies(user.session_userId, player.trophies);
        if(!isTrophiesUpdated){
            console.log('erro ao atualizar a quantidade de troféus')
        }

        res.render('dashboard', {
            userId: user.session_userId,
            userEmail: user.session_userEmail,
            userName: profileData.userName,
            userProfile: profileData.userProfile,
            player: player,
            currentDeck: player.currentDeck
        });

    }else{
        req.session.hasErrorLogin = true;
        req.session.errorMessageLogin = 'Faça login antes de acessar a Dashboard!';
        console.log(req.session.errorMessageLogin)
        
        res.redirect('/login');
    }

});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.redirect('/dashboard'); // Redirecione de volta para o dashboard em caso de erro
        }
        res.clearCookie('connect.sid'); // Limpar o cookie de sessão
        res.redirect('/login'); // Redirecionar para a tela de login
    });
});


module.exports = router;