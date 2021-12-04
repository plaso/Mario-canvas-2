class Game {
  constructor(ctx) {
    this.ctx = ctx

    this.background = new Background(ctx)
    this.player = new Player(ctx)
    this.coins = [
      new Coin(ctx, 300),
      new Coin(ctx, 340),
      new Coin(ctx, 380)
    ]

    this.intervalId = undefined

    this.sound = new Audio('assets/sound/mw-theme.mp3')
    this.sound.volume = 0.3
    this.coinSound = new Audio('assets/sound/coin.wav')

    this.score = 0
  }

  start() {
    if (!this.intervalId) {
      this.sound.play()

      this.sound.currentTime = 0
      this.intervalId = setInterval(() => {
        this.clear()

        this.move()

        this.draw()
        this.checkCollission()
      }, 1000 / 60)
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  drawScore() {
    this.ctx.fillText(`Score: ${this.score}`, 100, 100)
  }

  draw() {
    this.background.draw()

    this.coins.forEach(coin => coin.draw())

    this.player.draw()

    this.drawScore()
  }

  move() {
    this.background.move()
    this.player.move()
    this.coins.forEach(coin => coin.move())
  }

  onKeyDown(keyCode) {
    this.player.onKeyDown(keyCode)
  }

  onKeyUp(keyCode) {
    this.player.onKeyUp(keyCode)
  }

  checkCollission() {
    const coinColiding = this.coins.find(coin => this.player.collidesWith(coin))

    if (coinColiding) {
      this.coinSound.currentTime = 0
      this.coinSound.play()

      this.coins = this.coins.filter(coin => coin !== coinColiding)

      this.score++
    }
  }
}