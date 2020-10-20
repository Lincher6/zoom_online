import {createNewMessage, listenMessagesInput} from "./components/newMessage.js";
import {addVideoStream, createVideo} from "./components/video.js";
import {listenChatOpen} from "./components/chat.js";

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
        myVideoStream = stream
        addVideoStream(myVideo, myVideoStream)

        socket.on('user-connected', (userId) => {
            connectNewUser(userId, myVideoStream)
        })

        socket.emit('join-room', ROOM_ID, id)

        peer.on('call', call => {
            call.answer(myVideoStream)
            const video = createVideo()
            call.on('stream', userStream => {
                addVideoStream(video, userStream)
            })
        })

        listenMessagesInput(socket)
        socket.on('new-message', message => {
            createNewMessage(message)
        })

        listenChatOpen()
    })
})

const connectNewUser = (userId, stream) => {
    const call = peer.call(userId, stream)
    const video = createVideo()
    call.on('stream', userStream => {
        addVideoStream(video, userStream)
    })
}

