import {addVideoStream, createVideo} from "./video.js";

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