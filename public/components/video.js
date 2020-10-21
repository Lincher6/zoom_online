const videoGrid = document.getElementById('video-grid')

const info = document.getElementById('info')
export const putInfo = (roomId, userId) => {
    info.innerHTML = `
        <div>
            <span style="color: lightskyblue">ROOM ID: </span>
            ${roomId}
        </div>
        <div>
            <span style="color: lightskyblue">USER ID: </span>
            ${userId}
        </div>
    `
}


export const createVideo = () => document.createElement('video')

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