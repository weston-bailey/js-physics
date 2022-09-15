require('../styles/index.css')
const Vector = require('./Vector')
const Mouse = require('./Mouse')

document.addEventListener('DOMContentLoaded', main)

class Canvas {
  #mouse
  constructor({ parent }) {
    this.parent = document.querySelector(parent)
    
    // set up the canvas
    this.canvas = document.createElement('canvas')
    this.canvas.classList.add('canvas')
    this.canvas.setAttribute('height', getComputedStyle(this.canvas)['height']) 
    this.canvas.setAttribute('width', getComputedStyle(this.canvas)['width'])
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.ctx = this.canvas.getContext('2d')
    this.parent.appendChild(this.canvas)
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

function main() {
  const vSubCanvas = new Canvas({ parent: '#vector-sub' })
  const render = () => {
    // vector subtraction
    vSubCanvas.clear()
    vSubCanvas.drawPath(ctx => {
      const vSubCenter = new Vector(vSubCanvas.width * .5, vSubCanvas.height * .5)
      const vSubMouse = vSubCanvas.mouse
      const vSub = vSubMouse.copy().sub(vSubCenter)

      ctx.moveTo(vSubMouse.x, vSubMouse.y)
      ctx.lineTo(vSub.x, vSub.y)
    })
    requestAnimationFrame(render)
  }
  render() 
}
