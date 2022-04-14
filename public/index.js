const socket = io();

let message = document.getElementById('message');
let userName = document.getElementById('userName');
let btnSend = document.getElementById('send');
let output = document.getElementById('ouput');
let action = document.getElementById('action');

btnSend.addEventListener('click', ()=>{ //envia los datos al servidor EMITIENDO
    socket.emit('chat:message', {
        message: message.value,
        userName: userName.value
    });
    message.value = '';
});

message.addEventListener('keypress', ()=>{ 
    socket.emit('chat:typing', userName.value)
});//envia los datos al servidor EMITIENDOe 


socket.on('chat:message', (data)=>{ //recibe los datos del servidor ESCUCHANDO
    action.innerHTML = ''; //limpia el mensaje de que estaa escribiendo
    output.innerHTML +=`
    <p> <strong>${data.userName}</strong>: ${data.message}</p>`;

});


socket.on('chat:typing', (data)=>{
    action.innerHTML += `<p><em>${data} is typing a message...</em></p>`;
});




