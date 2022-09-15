const { floor, ceil, round, sqrt } = Math
const { max, min, clamp } = require('./MathLib')

module.exports = class Vector {
  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  copy() {
    return new Vector(this.x, this.y)
  }
  
  // static operations that return a new vector
  static add(operand, values) {
    return operand.copy().add(values)
  }

  static sub(operand, values) {
    return operand.copy().sub(values)
  }

  static mult(operand, values) {
    return operand.copy().mult(values)
  }

  static div(operand, values) {
    return operand.copy().div(values)
  }

  static min(operand, values) {
    const newVector = operand.copy()
    newVector.set({ x: min(newVector.x, values.x), y: min(newVector.y, values.y) })
    return newVector
  }

  static max(operand, values) { 
    const newVector = operand.copy()
    newVector.set({ 
      x: max(newVector.x, values.x), 
      y: max(newVector.y, values.y) 
    })
    return newVector
  }

  static clamp(operand, minValues, maxValues) {
    const newVector = operand.copy()
    newVector.set({ 
      x: clamp(newVector.x, minValues.x, maxValues.x), 
      y: clamp(newVector.y, minValues.y, maxValues.y) 
    })
    return newVector
  }

  // instance methods
  mag() {
    return sqrt(this.x * this.x + this.y * this.y)
  }
 
  floor() {
    this.x = floor(this.x)
    this.y = floor(this.y)
    return this
  }

  ceil() {
    this.x = ceil(this.x)
    this.y = ceil(this.y)
    return this
  }

  round() {
    this.x = round(this.x)
    this.y = round(this.y)
    return this
  }
  
  max(maximum) {
    this.x = max(this.x, maximum)
    this.y = max(this.y, maximum)
    return this
  }

  min(minimum) {
    this.x = min(this.x, minimum)
    this.y = min(this.y, minimum)
    return this
  }

  clamp(min, max) {
    this.x = clamp(this.x, min, max)
    this.y = clamp(this.y, min, max)
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
      this.set({
        x: this.x / mag,
        y: this.y / mag
      })
    }
    return this
  }
}
