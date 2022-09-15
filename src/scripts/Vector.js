const { floor, ceil, round,  sqrt } = Math

module.exports = class Vector {
  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  copy() {
    return new Vector(this.x, this.y)
  }
  
  // static operations between two vectors that return a new vector
  static add(x, y) {
    return x.copy().add(y)
  }

  static sub(x, y) {
    return x.copy().sub(y)
  }

  static mult(x, y) {
    return x.copy().mult(y)
  }

  static div(x, y) {
    return x.copy().div(y)
  }

  // instance methods
  mag() {
    return sqrt(this.x * this.x + this.y * this.y)
  }

  floor() {
    this.x = floor(x)
    this.y = floor(y)
    return this
  }

  ceil() {
    this.x = ceil(x)
    this.y = ceil(y)
    return this
  }

  round() {
    this.x = round(x)
    this.y = round(y)
    return this
  }

  set({ x, y }) {
    this.x = x || this.x
    this.y = y || this.y
    return this
  }

  add({ x, y }) {
    this.x += x
    this.y += y
    return this
  }

  sub({ x, y }) {
    this.x -= x
    this.y -= y
    return this
  }

  mult({ x, y }) {
    this.x *= x
    this.y *= y
    return this
  }

  div({ x, y }) {
    this.x /= x
    this.y /= y
    return this
  }

  normalize() {
    const mag = this.mag()
    if (mag !== 0) {
      this.x = this.x / mag
      this.y = this.y / mag
    }
    return this
  }
}
