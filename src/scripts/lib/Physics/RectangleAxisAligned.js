const Body = require('./Body')
const Vector = require('./Vector')

module.exports = class RectangleAxisAligned extends Body {
  constructor({ mass, location, velocity, acceleration, topSpeed, width, height, color }) {
    // physics
    super({ mass, location, velocity, acceleration, topSpeed })
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
  
  render(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.location.x, this.location.y, this.width, this.height)
  }
}

