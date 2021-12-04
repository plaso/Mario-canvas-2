const canvas = document.getElementById('game')

const ctx = canvas.getContext('2d')

const button = document.getElementById('start')

button.onclick = () => {
  button.remove()
}