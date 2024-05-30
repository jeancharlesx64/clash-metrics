const editBtn = document.querySelectorAll('.edit-modal');
const editModal = document.querySelector('#editModal');
const closeBtn = document.querySelectorAll('.close');

for(let i = 0; i < editBtn.length; i++){
    editBtn[i].addEventListener('click', ()=>{
        editModal.classList.toggle('active')

    })
}

for(let i = 0; i < closeBtn.length; i++){
    closeBtn[i].addEventListener('click', ()=>{
        editModal.classList.toggle('active');
    })
}

function previewImage() {
    var preview = document.getElementById('imgPreview');
    var file = document.getElementById('picture').files[0];
    var reader = new FileReader();
  
    reader.onloadend = function() {
      var img = document.createElement('img');
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