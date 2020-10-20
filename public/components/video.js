const videoGrid = document.getElementById('video-grid')

export const createVideo = () => document.createElement('video')

export const addVideoStream = (video, stream, id = 0) => {
    video.srcObject = stream
    video.setAttribute('data-id', id)
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}