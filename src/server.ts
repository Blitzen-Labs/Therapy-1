import express from 'express';
import 'reflect-metadata';
import './database';
import { router } from './routes';
import { ChatRoom } from './models/chatRoom';
import { MessageController } from './controller/MessageController';


//Criação de um app express
const app = express();
const cors = require('cors');//Configuração de níveis de acesso "cors"
const http = require('http').Server(app);
const io = require('socket.io')(http);
const messageController = new MessageController();




//Configurações de servidor
app.use(cors());
app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on("connection", function (socket) {
    var chatFull = [];



    socket.on("joinRoom", ({ name, room }, callback) => {
        console.log(name, room);
        socket.join(room);
        callback()
    })

    socket.on("msg", ({ nickname1, msg, chatRoom }) => {
        socket.broadcast.to(chatRoom).emit("msg", { nickname1, msg, chatRoom });
        messageController.createLog(nickname1, msg, chatRoom)
    })

    socket.on("connected", ({ msg, chatRoom }) => {
        socket.broadcast.to(chatRoom).emit("connected", { msg, chatRoom });
    })

    //Retorna o array do chat completo ao client
    socket.on("saveChat", (options) => {
        chatFull.push(options);

    });

    socket.on("disconnect", () => {
        console.log('Usuário desconectado')
    })
});



//Servidor iniciado
http.listen(8080, () => {
    console.log("Server is running!")
});

