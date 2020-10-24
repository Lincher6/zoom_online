const input = document.querySelector('input')
const button = document.querySelector('.btn')

const redirect = () => {
    if (input.value === '') {
        window.location += ROOM_ID
    } else {
        window.location += input.value
    }
}

button.onclick = redirect

input.onkeydown = e => {
    if (e.key === 'Enter') {
        redirect()
    }
}