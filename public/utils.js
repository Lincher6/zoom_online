const alertBlock = document.getElementById('alert')
let timer

export const alert = (text) => {
    if (timer) return

    alertBlock.innerText = text
    alertBlock.classList.add('fade')

    timer = setTimeout(() => {
        alertBlock.classList.remove('fade')
        timer = undefined
    }, 2000)
}