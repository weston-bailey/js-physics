require('../styles/index.css')
const Vector = require('./Vector')
const Canvas = require('./Canvas')

document.addEventListener('DOMContentLoaded', main)

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
