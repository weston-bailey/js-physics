module.exports = class Vector {
  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
  }
  copy() {
    return new Vector(this.x, this.y)
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
}
