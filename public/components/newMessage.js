const sendSound = new Audio('assets/send-sound.mp3')
sendSound.volume = .5

const chat = document.getElementById('chat')
const messagesWindow = document.querySelector('.main__right-messages')

document.getElementById('newMessage').innerHTML = `
    <input type="text" id="newMessage__input" placeholder="Add new message..."/>
    <div id="newMessage__send">
        <i class="fas fa-plus"></i>
    </div>
`

const newMessageInput = document.getElementById('newMessage__input')
const sendNewMessage = document.getElementById('newMessage__send')

export const listenMessagesInput = socket => {
    newMessageInput.onkeydown = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            socket.emit('send-message', e.target.value)
            e.target.value = ''
            sendSound.play()
        }
    }

    sendNewMessage.onclick = e => {
        if (newMessageInput.value !== '') {
            socket.emit('send-message', newMessageInput.value)
            newMessageInput.value = ''
            sendSound.play()
        }
    }
}

export const createNewMessage = (text, user = 'new user') => {
    const message = document.createElement('li');
    message.innerHTML = `
        <li>
            <div class="chat__user-name">${user}</div>
            <div class="chat__message-text">${text}</div>
        </li>
    `
    chat.append(message)
    scrollBottom()
}

const scrollBottom = () => {
    messagesWindow.scrollTop = messagesWindow.scrollHeight
}