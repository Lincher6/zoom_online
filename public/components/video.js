import {alert} from "../utils.js";

const videoGrid = document.getElementById('video-grid')

export const createVideo = () => {
    return document.createElement('video')
}

export const addVideoStream = (video, stream, id = 0) => {
    video.srcObject = stream
    video.setAttribute('data-id', id)
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })

    videoGrid.append(video)

    if (id !== 0) {
        let isMute = false
        video.onclick = () => {
            if (isMute) {
                video.volume = 1
            } else {
                video.volume = 0
            }
            isMute = !isMute
        }
    }
}


const info = document.getElementById('info')
export const putInfo = (roomId, userId) => {
    info.innerHTML = `
        <div style="color: lightskyblue">ROOM ID:</div>
        <div id="info__id">${roomId}</div>
        <div class="button" data-copy="roomId">
            <i class="far fa-copy"></i>
        </div>
    `
    const copyButton = document.querySelector(`[data-copy="roomId"]`)

    copyButton.onclick = () => {
        const range = document.createRange();
        range.selectNode(document.querySelector(`#info__id`));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        alert('Copied')
    }
}

export const clearVideoGrid = () => {
    videoGrid.innerHTML = ''
}