const canvas = document.getElementById('game')

const ctx = canvas.getContext('2d')

const game = new Game(ctx)

const button = document.getElementById('start')

button.onclick = () => {
  button.remove()

  game.start()
}

document.addEventListener('keydown', (event) => {
  game.onKeyDown(event.keyCode)
})

document.addEventListener('keyup', (event) => {
  game.onKeyUp(event.keyCode)
})