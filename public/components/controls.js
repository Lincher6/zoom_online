import {openChat} from "./chat.js";

export const listenControls = ({ myVideo, socket, ROOM_ID, id, stream }) => {
    const chatButton = document.getElementById('controls__chat')
    chatButton.onclick = () => openChat()

    const muteButton = document.getElementById('controls__mute')
    let isMute = false
    const unMuteIcon = `<i class="fas fa-microphone-slash"></i>`
    const muteIcon = `<i class="fas fa-microphone"></i>`
    muteButton.onclick = () => {
        if(isMute) {
            isMute = false
            myVideo.volume = 1
            muteButton.innerHTML = `
                ${muteIcon}
                Mute
            `
        } else {
            isMute = true
            myVideo.volume = 0
            muteButton.innerHTML = `
                ${unMuteIcon}
                Mute
            `
        }
    }

    const videoButton = document.getElementById('controls__video')
    let isPlaying = true
    const play = `<i class="fas fa-video-slash"></i>`
    const stop = `<i class="fas fa-video"></i>`
    videoButton.onclick = () => {
        if(isPlaying) {
            isPlaying = false
            myVideo.pause()
            videoButton.innerHTML = `
                ${play}
                Video
            `
        } else {
            isPlaying = true
            myVideo.play()
            videoButton.innerHTML = `
                ${stop}
                Video
            `
        }
    }
}

