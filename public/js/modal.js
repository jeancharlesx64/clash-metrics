const editBtn = document.querySelectorAll('.edit-modal');
const editModal = document.querySelector('#editModal');
const editClose = document.querySelectorAll('.close-edit');

for(let i = 0; i < editBtn.length; i++){
    editBtn[i].addEventListener('click', ()=>{
        editModal.classList.toggle('active')

    })
}

for(let i = 0; i < editClose.length; i++){
    editClose[i].addEventListener('click', ()=>{
        editModal.classList.toggle('active');
    })
}

function previewImageEdit() {
    let preview = document.getElementById('img-edit-preview');
    let file = document.getElementById('picture-edit').files[0];
    let reader = new FileReader();
  
    reader.onloadend = function() {
      let img = document.createElement('img');
      img.src = reader.result;
      preview.innerHTML = '';
      preview.appendChild(img);
    }
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.innerHTML = 'Preview da imagem aqui';
    }
}



const createBtn = document.querySelectorAll('.btn-create');
const createModal = document.querySelector('#createModal');
const createClose = document.querySelectorAll('.close-create');

for(let i = 0; i < createBtn.length; i++){
    createBtn[i].addEventListener('click', ()=>{
        createModal.classList.toggle('active')

    })
}

for(let i = 0; i < createClose.length; i++){
    createClose[i].addEventListener('click', ()=>{
        createModal.classList.toggle('active');
    })
}

function previewImageCreate() {
    let preview = document.getElementById('img-create-preview');
    let file = document.getElementById('picture-create').files[0];
    let reader = new FileReader();
  
    reader.onloadend = function() {
      let img = document.createElement('img');
      img.src = reader.result;
      preview.innerHTML = '';
      preview.appendChild(img);
    }
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.innerHTML = 'Preview da imagem aqui';
    }
}