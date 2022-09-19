const Mouse = require('../Input/Mouse')
const { Vector } = require('../Physics')

module.exports = class Canvas {
  #mouse
  #requestId
  constructor({ parent }) {
    this.parent = document.querySelector(parent)
    
    // set up the canvas
    this.canvas = document.createElement('canvas')
    this.canvas.classList.add('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.parent.appendChild(this.canvas) 
    this.width = 0
    this.height = 0
    this.init()
  }

  get mouse() {
    return this.#mouse.location.copy()
  }

  get mouseClick() {
    return this.#mouse.isClicking
  }

  init() {
    this.canvas.setAttribute('height', getComputedStyle(this.canvas)['height']) 
    this.canvas.setAttribute('width', getComputedStyle(this.canvas)['width'])
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.#mouse = new Mouse({ 
      element: this.canvas, 
      startingVector: new Vector(this.width * .5, this.height * .5)
    })
  }

  resetMouse() {
    this.#mouse.reset()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  background(color) {
    this.ctx.fillStyle = color
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  drawPath(cb) {
    const { ctx } = this
    ctx.beginPath()
    cb(ctx)
    ctx.stroke()
  }

  render(cb) {
    const renderRecurse = () => {
      cb(this.ctx)
      this.#requestId = requestAnimationFrame(renderRecurse)
    }

    this.#requestId = requestAnimationFrame(renderRecurse)
  }

  cancelRender() {
    cancelAnimationFrame(this.#requestId)
  }
}
