const chatToggle = document.getElementById('chat-burger')
const mainRight = document.querySelector('.main__right')

const closeIcon = `<i class="fas fa-times"></i>`
const openIcon = `<i class="fas fa-bars"></i>`

let closed = false

export const listenChatOpen = () => chatToggle.addEventListener('click', () => {
    if (closed) {
        mainRight.style.marginRight = '0'
        closed = false
        chatToggle.innerHTML = closeIcon
    } else {
        mainRight.style.marginRight = '-300px'
        closed = true
        chatToggle.innerHTML = openIcon
    }
})