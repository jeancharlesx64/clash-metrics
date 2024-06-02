var database = require('../configs/database/connection');

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
    createPost
};