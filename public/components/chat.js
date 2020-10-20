const chatToggler = document.getElementById('chat-burger')
const mainRight = document.querySelector('.main__right')

const closeIcon = `<i class="fas fa-times"></i>`
const openIcon = `<i class="fas fa-bars"></i>`

let closed = false

export const toggleChat = () => {
    if (closed) {
        mainRight.style.marginRight = '0'
        closed = false
        chatToggler.innerHTML = closeIcon
    } else {
        mainRight.style.marginRight = '-300px'
        closed = true
        chatToggler.innerHTML = openIcon
    }
}

export const openChat = () => {
    mainRight.style.marginRight = '0'
    closed = false
    chatToggler.innerHTML = closeIcon
}

export const listenChatOpen = () => chatToggler.addEventListener('click', toggleChat)