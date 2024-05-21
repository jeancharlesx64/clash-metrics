// retirar o modal da tela caso houver erro
const registeredMessageElement = document.querySelector('#modalRegistered');

if (registeredMessageElement) {
    setTimeout(() => {
        registeredMessageElement.style.display = 'none';
    }, 3000); 

    registeredMessageElement.addEventListener('click', ()=>{
        registeredMessageElement.style.display = 'none';
    })
    
}
