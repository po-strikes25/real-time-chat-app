/* 
    Initialize server : importing express 
*/
const express = require('express')

/* sets up express and allows us to create a server */
const app = express()

/* whenever we are trying to access port 9000, it will run public folder */
/* giving public folder to express app */
/* link frontend to backend */
app.use(express.static('public'))

/* making a server with "http" and express */
const server = require('http').Server(app)

/* importing socket.io and linking it with server */
const io = require('socket.io')(server)

/* whenever IO is connected/accessed by a socket, the socket is captured */
io.on('connection', (socket) => {
    console.log('socket', socket.id);
    // socket 3O1LOFW4uvBWTWKkAAAB

    /* receiving message (data) from socket in IO */
    /* message emitted by (socket.emit()) in script.js */
    /* trigerring on 'message' event */
    socket.on('message', (data) => {
        /* emitting the message (data) to all sockets from IO */
        io.emit('message', data)
    })

    /* when one of the users leaves the chat */
    /* 
        now open another localhost:9000;
        you will see a new socket number;
        in total there are now 2 sockets/users; 
    */
    socket.on('disconnect', () => {
        console.log('User has left the chat');
    })
})


/* on which port this server should be available */
/* localhost:9000 */
const PORT = 9000

/* express keeps the server up and running */
server.listen(PORT, () => {
    console.log(`Express server is running ${PORT}`);
})

/* once the server is hosted -dev dependency is no longer required */
