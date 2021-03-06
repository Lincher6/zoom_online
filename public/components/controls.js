import {openChat} from "./chat.js";
import {alert} from "../utils.js";
import {copyRoomId} from "./video.js";

const colorDefault = 'lightgrey'
const colorOff = 'red'
const colorActive = 'lightskyblue'
let isRoomClosed = false
const unMuteIcon = `<i class="fas fa-microphone"></i>`
const muteIcon = `<i class="fas fa-microphone-slash"></i>`
const playIcon = `<i class="fas fa-video"></i>`
const stopIcon = `<i class="fas fa-video-slash"></i>`
const securityIcon = `<i class="fas fa-shield-alt"></i>`
const participantsIcon = `<i class="fas fa-user-friends"></i>`
const chatIcon = `<i class="fas fa-comment-alt"></i>`
const leaveIcon = `<i class="fas fa-sign-out-alt"></i>`

const createButton = (id, icon, text) => {
    const element = document.getElementById(id)
    element.innerHTML = `
        ${icon}
        <div>${text}</div>
    `

    return element
}

const muteButton = createButton('controls__mute', unMuteIcon, 'Mute')
const videoButton = createButton('controls__video', playIcon, 'Video')
const securityButton = createButton('controls__security', securityIcon, 'Security')
const shareButton = createButton('controls__participants', participantsIcon, 'Share')
const chatButton = createButton('controls__chat', chatIcon, 'Chat')
const leaveButton = createButton('controls__leave', leaveIcon, 'Leave Room')

const mediaToggle = (button, method, iconOn, iconOff, text, stream) => {
    const media = stream[method]()[0]
    button.onclick = () => {
        if(media.enabled) {
            media.enabled = false
            button.innerHTML = `${iconOff} ${text}`
            button.style.color = colorOff
        } else {
            media.enabled = true
            button.innerHTML = `${iconOn} ${text}`
            button.style.color = colorDefault
        }
    }
}

export const listenControls = ({ myVideo, socket, ROOM_ID, id, stream }) => {

    enableControls()

    mediaToggle(muteButton, 'getAudioTracks', unMuteIcon, muteIcon, 'Mute', stream)
    mediaToggle(videoButton, 'getVideoTracks', playIcon, stopIcon, 'Video', stream)

    securityButton.onclick = () => socket.emit('secure-room', ROOM_ID, !isRoomClosed )

    shareButton.onclick = copyRoomId

    chatButton.onclick = () => openChat()

    leaveButton.onclick = () => {
        socket.emit('leave-room', ROOM_ID, id, stream)
        window.location = '/'
    }
}

export const closeRoom = (close) => {
    isRoomClosed = close
    if(close) {
        alert('Room blocked')
        securityButton.style.color = colorActive
        securityButton.innerHTML = `${securityIcon} Blocked`
    } else {
        securityButton.style.color = colorDefault
        securityButton.innerHTML = `${securityIcon} Security`
    }
}

export const disableControls = () => {
    muteButton.classList.add('disabled')
    videoButton.classList.add('disabled')
    securityButton.classList.add('disabled')
    shareButton.classList.add('disabled')
    chatButton.classList.add('disabled')
}

export const enableControls = () => {
    muteButton.classList.remove('disabled')
    videoButton.classList.remove('disabled')
    securityButton.classList.remove('disabled')
    shareButton.classList.remove('disabled')
    chatButton.classList.remove('disabled')
}
