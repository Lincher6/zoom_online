require('dotenv').config();
const express = require('express')
const { v4: uuid } = require('uuid')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server, {
    debug: true
})

app.use('/peerjs', peerServer)
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.redirect(`/${uuid()}`)
})

app.get('/:room', (req, res) => {
    res.render(`room`, { roomId: req.params.room })
})

server.listen(process.env.PORT)

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).emit('user-connected', userId)

        socket.on('send-message', message => {
            io.to(roomId).emit('new-message', message)
        })
    })

    socket.on('leave-room', (roomId, userId) => {
        socket.leave(roomId)
        socket.to(roomId).emit('user-disconnected', userId)
    })
})
