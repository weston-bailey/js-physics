const { 
    Vector, 
    Canvas, 
    RectangleAxisAligned, 
    Gravity,
    randomInRange, 
    randomRGBAHex,
    randomRGBHex,
    Body, 
    Circle,
  } = require('../lib')

module.exports = () => {
    const canvas = new Canvas({ parent: '#div-id' })
    const container = document.querySelector('#other-div-id')    

    const init = () => {
		canvas.resetMouse()
		container.style.display = 'block'
		canvas.init()
    }
  
    const render = () => {
		canvas.clear()
    }
  
    init()
    canvas.render(render)
  
    return () => {
		container.style.display = 'none'
		canvas.cancelRender()
		canvas.parent.removeChild(canvas.canvas)
	}
}
