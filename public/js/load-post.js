let page = 1;

async function loadMorePosts() {
    const response = await fetch(`/api/posts?page=${page}`);
    const posts = await response.json();
    const feedContainer = document.getElementById('feed');

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <div class="user-info">
                    <div class="profile-wrapper-post">
                        <img src="${post.fotoPerfil}" alt="Profile Picture">
                    </div>
                    <div class="username-wrapper-post">
                        <p>${post.usuario}</p>
                        <span>${post.gamertag} - <span>${new Date(post.postDataCriacao).toLocaleTimeString()}</span></span>
                    </div>
                </div>
            </div>
            <div class="post-body">
                <div class="img-wrapper">
                    ${post.fotoPost ? `<img src="${post.fotoPost}" alt="Post Image">` : ''}
                </div>
            </div>
            <div class="post-footer">
                <div class="upper-footer">
                    <p>${post.descricao}</p>
                </div>
                <div class="footer-line"></div>
                <div class="bottom-footer">
                    <div class="good-ava">
                        <img width="30" height="30" src="https://img.icons8.com/material-outlined/24/happy--v1.png" alt="happy--v1"/>
                        12
                    </div>
                    <div class="bad-ava">
                        <img width="30" height="30" src="https://img.icons8.com/material-outlined/24/sad.png" alt="sad"/>
                        4
                    </div>
                </div>
            </div>
        `;
        feedContainer.appendChild(postElement);
    });

    page++;
}

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        loadMorePosts();
    }
});

document.addEventListener('DOMContentLoaded', loadMorePosts);
