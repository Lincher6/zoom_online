const videoGrid = document.getElementById('video-grid')

export const createVideo = () => document.createElement('video')

export const addVideoStream = (video, stream) => {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}