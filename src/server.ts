import express from 'express';
import 'reflect-metadata';
import './database';
import { router } from './routes';
import { ChatRoom } from './models/chatRoom';

//Criação de um app express
const app = express();
const cors = require('cors');//Configuração de níveis de acesso "cors"
const http = require('http').Server(app);
const io = require('socket.io')(http);




//Configurações de servidor
app.use(cors());
app.use(express.json());
app.use(router);

app.get('/',(req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on("connection", function (socket) {
    var chatFull = [];

    socket.on("joinRoom", ({nickname1, chatRoom})=>{
        socket.join(chatRoom);
        console.log(nickname1 + " conectado na sala " + chatRoom);
    })

    socket.on("msg", function({msg, chatRoom}){
        socket.broadcast.to(chatRoom).emit("msg", msg);
    })



    //Retorna o array do chat completo ao client
    socket.on("saveChat", (options)=>{
        chatFull.push(options);
        console.log(chatFull);
        
    });

    // socket.on("disconnect", ()=>{
    //     io.emit("msg", "Um usuário saiu </br>")
    // })
  });



//Servidor iniciado
http.listen(8080, () => {
    console.log("Server is running!")
});

