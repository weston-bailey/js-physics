const Mouse = require('./Mouse')

module.exports = class Canvas {
  #mouse
  constructor({ parent }) {
    this.parent = document.querySelector(parent)
    
    // set up the canvas
    this.canvas = document.createElement('canvas')
    this.canvas.classList.add('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.parent.appendChild(this.canvas) 
    this.canvas.setAttribute('height', getComputedStyle(this.canvas)['height']) 
    this.canvas.setAttribute('width', getComputedStyle(this.canvas)['width'])
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.#mouse = new Mouse({ element: this.canvas })
  }

  get mouse() {
    return this.#mouse.position.copy()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  drawPath(cb) {
    const { ctx } = this
    ctx.beginPath()
    cb(ctx)
    ctx.stroke()
  }
}
