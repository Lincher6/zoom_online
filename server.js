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

server.listen(process.env.PORT || 3030)

const rooms = {}
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {

        if (!rooms[roomId]) {
            rooms[roomId] = 'open'
        }

        if (rooms[roomId] === 'open') {
            socket.join(roomId)
            socket.to(roomId).emit('user-connected', userId)

            socket.on('send-message', message => {
                io.to(roomId).emit('new-message', message)
            })

            socket.on('secure-room', (roomId, close) => {
                rooms[roomId] = close ? 'closed' : 'open'
                io.to(roomId).emit('close-room', close)
            })

            socket.on('leave-room', (roomId, userId) => {
                socket.leave(roomId)
                socket.to(roomId).emit('user-disconnected', userId)
            })

            socket.on('disconnect', () => {
                socket.leave(roomId)
                socket.to(roomId).emit('user-disconnected', userId)
            })
        }

    })
})
