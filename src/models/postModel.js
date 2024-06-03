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



async function getPosts() {
    let sqlCommand = `
        SELECT 
            post.descricao,
            post.fotoPost,
            post.dataCriacao,
            usuario.usuario,
            usuario.gamertag,
            usuario.fotoPerfil
        FROM 
            post
        INNER JOIN 
            usuario ON post.fkUsuario = usuario.idUsuario
        ORDER BY 
            post.dataCriacao DESC
        LIMIT   
            10      
    `;
  
    try {
      const response = await database.execute(sqlCommand);
  
      const posts = response.map(row => ({
        descricao: row.descricao,
        fotoPost: row.fotoPost,
        dataCriacao: row.dataCriacao,
        usuario: {
          nome: row.usuario,
          gamertag: row.gamertag,
          fotoPerfil: row.fotoPerfil
        }
      }));
      console.log('teste')
      console.log(posts)
      return posts;
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      throw error;
    }
  }

  
  async function getUserPosts(userId) {
    let sqlCommand = `
      SELECT 
        post.descricao,
        post.fotoPost,
        post.dataCriacao
      FROM 
        post
      INNER JOIN 
        usuario ON post.fkUsuario = usuario.idUsuario
      WHERE 
        post.fkUsuario = ${userId}
      ORDER BY 
        post.dataCriacao DESC;
    `;
  
    try {
      const response = await database.execute(sqlCommand);
  
      const userPosts = response.map(row => ({
        descricao: row.descricao,
        fotoPost: row.fotoPost,
        dataCriacao: row.dataCriacao,
      }));

      return userPosts;
    } catch (error) {
      console.error('Erro ao buscar posts do usuário:', error);
      throw error;
    }
  }
module.exports = {
    createPost,
    getPosts,
    getUserPosts
};