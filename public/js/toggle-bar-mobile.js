const btnBurger = document.querySelector('#btn-burger-mobile');

btnBurger.addEventListener('click', ()=>{
    const header = document.querySelector('.header');
    const navBar = document.querySelector('.nav-bar');
    const btnBurgerIcon = document.querySelector('#btn-burger-icon');

    header.classList.toggle('active');
    navBar.classList.toggle('active');
    btnBurger.classList.toggle('active');

    if(header.classList.contains('active')){
        btnBurgerIcon.innerHTML = `
             <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/multiply.png" alt="multiply"/>
        `
    }else{
        btnBurgerIcon.innerHTML = `
            <img width="30" height="30" src="https://img.icons8.com/external-febrian-hidayat-glyph-febrian-hidayat/64/FFFFFF/external-burger-bar-ui-essential-febrian-hidayat-glyph-febrian-hidayat.png" alt="external-burger-bar-ui-essential-febrian-hidayat-glyph-febrian-hidayat"/>
        `
    }

})