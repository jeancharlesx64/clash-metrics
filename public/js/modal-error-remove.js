// retirar o modal da tela caso houver erro
const errorMessageElement = document.querySelector('#modalErro');

if (errorMessageElement) {
    setTimeout(() => {
        errorMessageElement.style.display = 'none';
    }, 3000); 

    errorMessageElement.addEventListener('click', ()=>{
        errorMessageElement.style.display = 'none';
    })
    
}
