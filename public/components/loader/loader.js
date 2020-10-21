const videoGrid = document.getElementById('video-grid')
export const showLoader = (isLoading) => {
    if (isLoading) {
        videoGrid.innerHTML = `<div class="lds-dual-ring"></div>`
    } else {
        videoGrid.innerHTML = ``
    }
}