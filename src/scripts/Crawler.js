const Vector = require('./Vector')

module.exports = class Crawler {
  constructor({ location, velocity, acceleration, topSpeed, width, height, color }) {
    // physics
    this.location = location || new Vector()
    this.velocity = velocity || new Vector()
    this.acceleration = acceleration || new Vector()
    this.topSpeed = topSpeed || 10
    this.updateQueue = []
    // size
    this.width = width
    this.height = height
    // rendering
    this.color = color
  }

  get top() {
    return this.location.x
  }

  get bottom() {
    return this.locaiton.x + this.height
  }

  get left() {
    return this.location.y
  }

  get right() {
    return this.location.y + this.width
  }

  get center() {
    return new Vector(this.location.x + (this.width * .5), this.location.y + (this.height * .5))
  }
  
  enqueueUpdate(cb, ...args) {
    this.updateQueue.push(() => cb(this, ...args))
  }

  update() {

    while (this.updateQueue.length) {
      this.updateQueue[0]()
      this.updateQueue.shift()
    }

    this.velocity.add(this.acceleration)
    this.velocity.max(this.topSpeed)
    this.location.add(this.velocity)
    this.location.floor()
  }
  
  render(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.location.x, this.location.y, this.width, this.height)
  }
}

