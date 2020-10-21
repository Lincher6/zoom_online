import {createNewMessage, listenMessagesInput} from "./components/newMessage.js";
import {addVideoStream, createVideo, putInfo} from "./components/video.js";
import {listenChatOpen} from "./components/chat.js";
import {listenControls, closeRoom} from "./components/controls.js";

const socket = io('/')

const myVideo = createVideo()
myVideo.muted = true

let myVideoStream
let peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: 3030
})

peer.on('open', id => {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then( stream => {
        window.onbeforeunload = () => {
            socket.emit('leave-room', ROOM_ID, id, stream)
        }

        myVideoStream = stream
        addVideoStream(myVideo, myVideoStream)

        socket.on('user-disconnected', (userId) => {
            disconnectUser(userId)
        })

        socket.on('user-connected', (userId) => {
            connectNewUser(userId, myVideoStream)
        })

        socket.on('close-room', (close) => {
            closeRoom(close)
        })

        socket.emit('join-room', ROOM_ID, id)

        peer.on('call', call => {
            call.answer(myVideoStream)
            const video = createVideo()
            call.on('stream', userStream => {
                addVideoStream(video, userStream, call.peer)
            })
        })

        listenMessagesInput(socket)
        socket.on('new-message', message => {
            createNewMessage(message)
        })

        putInfo(ROOM_ID, id)
        listenChatOpen()
        listenControls({ myVideo, socket, ROOM_ID, id, stream })
    })
})

const connectNewUser = (userId, stream) => {
    const call = peer.call(userId, stream)
    const video = createVideo()
    call.on('stream', userStream => {
        addVideoStream(video, userStream, userId)
    })
}

const disconnectUser = (userId) => {
    const video = document.querySelector(`[data-id="${userId}"]`)
    video.remove()
}




