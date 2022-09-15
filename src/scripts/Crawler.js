const Vector = require('./Vector')

module.exports = class Crawler {
  constructor({ location, velocity, acceleraction, topSpeed, width, height }) {
    this.location = new Vector(location.x, location.y) || new Vector()
    this.velocity = new Vector(velocity.x, velocity.y) || new Vector()
    this.acceleration = new Vector(acceleration.x, acceleration.y) || new Vector()
    this.topSpeed = topSpeed || 10
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

}

