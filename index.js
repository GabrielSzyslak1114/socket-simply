const express = require('express');
const app = express();
const path = require('path');

//static files
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 5000;

// app.use('/', (req, res) => {
//     res.send('hola')
// })

const server = app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`);
});

//websocket
const SocketIO = require('socket.io');
const io = SocketIO(server);


io.on('connection', (socket)=>{
    console.log('user connected', socket.id);

    socket.on('chat:message', (data)=>{ //recibe el dato del cliente
        console.log(data);
        io.sockets.emit('chat:message', data); //emite el dato al cliente
    });
    
    socket.on('chat:typing', (data)=>{ 
        socket.broadcast.emit('chat:typing', data)
    })//recibe el dato del cliente
});