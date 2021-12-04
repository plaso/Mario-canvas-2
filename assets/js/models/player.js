class Player {
  constructor(ctx) {
    this.ctx = ctx

    this.x = 100
    this.maxY = 340
    this.y = this.maxY

    this.vx = 0
    this.vy = 0
    this.ay = 0.2

    this.speedX = 3

    this.width = 34
    this.height = 47

    this.img = new Image()
    this.img.src = 'assets/imgs/mario-sprite.png'
    this.img.isReady = false

    this.img.onload = () => {
      this.img.isReady = true
    }

    this.horizontalFrames = 2
    this.verticalFrames = 2

    this.xFrame = 0
    this.yFrame = 1

    this.tick = 0

    this.jumping = false
    this.running = false
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      (this.img.width * this.xFrame) / this.horizontalFrames,
      (this.img.height * this.yFrame) / this.verticalFrames,
      this.img.width / this.horizontalFrames,
      this.img.height / this.verticalFrames,
      this.x,
      this.y,
      this.width,
      this.height
    )

    this.tick++
  }

  move() {
    this.x += this.vx

    this.vy += this.ay
    this.y += this.vy

    if (this.x <= 0) {
      this.x = 0
    }
    if (this.x + this.width >= this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.width
    }

    if (this.y <= 0) {
      this.y = 0
    }
    if (this.y >= this.maxY) {
      this.y = this.maxY
      this.jumping = false
    }

    if (!this.jumping && this.running) {
      this.yFrame = 1

      if (this.tick % 10 === 0) {
        this.xFrame += 1
  
        if (this.xFrame > 1) {
          this.xFrame = 0
        }
      }
    }

    if (!this.running) {
      this.yFrame = 1
      this.xFrame = 0
    }

    if (this.jumping) {
      this.yFrame = 0
      this.xFrame = 0
    }
  }

  onKeyDown(keyCode) {
    if (keyCode === TOP_KEY && !this.jumping) {
      this.vy = -5
      this.jumping = true
    }

    if (keyCode === LEFT_KEY) {
      this.vx = -this.speedX
      this.running = true
    }

    if (keyCode === RIGHT_KEY) {
      this.vx = this.speedX
      this.running = true
    }
  }
  
  onKeyUp(keyCode) {
    if (keyCode === RIGHT_KEY || keyCode === LEFT_KEY) {
      this.vx = 0
      this.running = false
    }
  }

  collidesWith(coin) {
    return this.x < coin.x + coin.width &&
      this.x + this.width > coin.x &&
      this.y < coin.y + coin.height &&
      this.y + this.height > coin.y
  }
}