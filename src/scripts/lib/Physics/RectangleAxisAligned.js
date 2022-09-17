const Vector = require('./Vector')

module.exports = class RectangleAxisAligned {
  constructor({ mass, location, velocity, acceleration, topSpeed, width, height, color }) {
    // physics
    this.mass = mass || 1
    this.location = location || new Vector()
    this.velocity = velocity || new Vector()
    this.acceleration = acceleration || new Vector()
    this.topSpeed = topSpeed || 10
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
  
  applyForce({ x, y }) {
    const force = new Vector(x, y).div({ x: this.mass, y: this.mass }) 
    this.acceleration.add(force)
  }

  update() {
    this.velocity.add(this.acceleration)
    this.velocity.max(this.topSpeed)
    this.location.add(this.velocity)
    this.acceleration.set({ x: 0, y: 0 })
    this.location.floor()
  }
  
  render(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.location.x, this.location.y, this.width, this.height)
  }
}

