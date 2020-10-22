import {createNewMessage, listenMessagesInput} from "./components/newMessage.js";
import {addVideoStream, createVideo, putInfo} from "./components/video.js";
import {listenChatOpen} from "./components/chat.js";
import {listenControls, closeRoom, disableControls} from "./components/controls.js";
import {connectNewUser, disconnectUser} from "./components/connection.js";
import {showLoader} from "./components/loader/loader.js";
import {alert} from "./utils.js";
import {askToTryAgain} from "./components/connection.js";
import {clearVideoGrid} from "./components/video.js";

const socket = io('/')

const myVideo = createVideo()
myVideo.muted = true

let myVideoStream

let peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: 3030
})

showLoader(true)
peer.on('open', id => {
    connectDevice(id)
})

const connectDevice = (myId) => {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then( stream => {
        showLoader(false)
        myVideoStream = stream
        addVideoStream(myVideo, myVideoStream)
        putInfo(ROOM_ID, myId)

        socket.emit('join-room', ROOM_ID, myId)

        socket.on('user-connected', (userId) => {
            connectNewUser(userId, myVideoStream, peer)
        })

        socket.on('close-room', (close) => {
            closeRoom(close)
        })

        socket.on('user-disconnected', (userId) => {
            if (myId !== userId) {
                disconnectUser(userId)
            }
        })

        socket.on('new-message', message => {
            createNewMessage(message)
        })

        peer.on('call', call => {
            call.answer(myVideoStream)
            const video = createVideo()
            call.on('stream', userStream => {
                addVideoStream(video, userStream, call.peer)
            })
        })

        listenMessagesInput(socket)
        listenChatOpen()
        listenControls({ myVideo, socket, ROOM_ID, id: myId, stream })

    }).catch(e => {
        disableControls()
        alert('No devices found')
        showLoader(false)
        askToTryAgain(() => reconnect(myId))
    })

    navigator.mediaDevices.ondevicechange = (e) => {
        console.log('here')
        disableControls()
        alert('Device changed')
        askToTryAgain(() => reconnect(myId));
        socket.emit('leave-room', ROOM_ID, myId)
    }
}

const reconnect = (id) => {
    clearVideoGrid()
    showLoader(true)
    socket.removeAllListeners("user-connected")
    socket.removeAllListeners("close-room")
    socket.removeAllListeners("user-disconnected")
    socket.removeAllListeners("new-message")
    connectDevice(id)
}






