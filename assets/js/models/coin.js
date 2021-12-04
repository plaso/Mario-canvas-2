class Coin {
  constructor(ctx, x) {
    this.ctx = ctx

    this.x = x
    this.y = 350

    this.width = 14
    this.height = 18

    this.vx = -1

    this.img = new Image()
    this.img.src = 'assets/imgs/coin-sprite.png'
    this.img.isReady = false
    this.img.onload = () => {
      this.img.isReady = true
    }

    this.horizontalFrames = 4
    this.verticalFrames = 1

    this.xFrame = 0
    this.yFrame = 0

    this.tick = 0
  }

  draw() {
    if (this.img.isReady) {
      console.log();
      this.ctx.drawImage(
        this.img,
        (this.img.width * this.xFrame) / this.horizontalFrames,
        (this.img.height * this.yFrame) / this.verticalFrames,
        this.img.width / this.horizontalFrames,
        this.img.height * this.verticalFrames,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }

    this.tick++
  }

  move() {
    if (this.tick % 10 === 0) {
      this.xFrame++

      if (this.xFrame >= this.horizontalFrames) {
        this.xFrame = 0
      }
    }
  }
} 