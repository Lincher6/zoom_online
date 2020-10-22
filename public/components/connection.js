import {addVideoStream, createVideo} from "./video.js";

const videoGrid = document.getElementById('video-grid')

export const connectNewUser = (userId, stream, peer) => {
    const call = peer.call(userId, stream)
    const video = createVideo()
    call.on('stream', userStream => {
        addVideoStream(video, userStream, userId)
    })
}

export const disconnectUser = (userId) => {
    const video = document.querySelector(`[data-id="${userId}"]`)
    video.remove()
}

export const askToTryAgain = (fn) => {
    videoGrid.innerHTML = `
        <div>
            <div>No Connection</div>
            <div id="try-again">Try again</div>
        </div>
    `
    const button = document.getElementById('try-again')
    button.onclick = fn
}