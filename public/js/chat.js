const txtId = document.querySelector('#user_id').textContent;
const txtName = document.querySelector('#user_name').textContent;


const chatContainer = document.querySelector('.chat-container');
function getRandomColor() {
    let colorList = [
        "aqua",
        "black",
        "blue",
        "fuchsia",
        "gray",
        "green",
        "lime",
        "maroon",
        "navy",
        "olive",
        "orange",
        "purple",
        "red",
        "silver",
        "teal",
        "white",
        "yellow"
    ];

    let randomNumber = Math.floor(Math.random() * 17); // Gera um número aleatório entre 0 e 16

    return colorList[randomNumber];
  }

const user = {
    id: txtId,
    name: txtName,
    color: getRandomColor()
}

function createSelfMessageElement(content){
    const div = document.createElement('div');
    div.classList.add('message-self');

    div.innerHTML = content;

    return div;
}

function createOtherMessageElement(content, sender, senderColor){
    const div = document.createElement('div');
    const span = document.createElement('span');
    div.classList.add('message-other');
    span.classList.add('message-sender');

    span.style.color = senderColor;

    div.appendChild(span);


    span.innerHTML = sender;
    div.innerHTML += content;

    return div;
}
function screenScrollAuto(){
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    })
}
const ws = new WebSocket('ws://localhost:3334');
ws.onmessage = getServerMessage;

const btnSend = document.querySelector('#btn-send');

ws.onopen = (e)=>{
    btnSend.addEventListener('click',(e)=>{
        let input_message = document.querySelector('#message');

        const message = {
            userId: user.id,
            userName: user.name,
            userColor: user.color,
            content: input_message.value
        }

        ws.send(JSON.stringify(message));

        input_message.value = ''
    })
}

function getServerMessage({data}){
    console.log(JSON.parse(data))
    const { userId, userName, userColor, content} = JSON.parse(data)

    let element;
    if(userId == user.id){
        element = createSelfMessageElement(content)

    }else{
        element = createOtherMessageElement(content, userName, userColor)

    }

    chatContainer.appendChild(element)
}   