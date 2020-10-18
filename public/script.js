const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const createVideo = () =>  document.createElement('video')
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
    })
})



const addVideoStream = (video, stream) => {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}

const connectNewUser = (userId, stream) => {
    const call = peer.call(userId, stream)
    const video = createVideo()
    call.on('stream', userStream => {
        addVideoStream(video, userStream)
    })
}

