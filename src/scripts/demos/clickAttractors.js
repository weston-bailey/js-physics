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
    const canvas = new Canvas({ parent: '#click-attractors' })
    const container = document.querySelector('#click-attractors-display')
    
    // have an array of gravity/body objects, they can be pushed on mouse click
		// ie [{ new Body, new Gravity }, { new Body, new Gravity }] 
		// these will attract particles 
	// use static properties for each object
	// have an array of particles to be created that get attracted to the gravity bodies
	// loop the array of particles and apply each gravity to each particle
	// should probabaly copy alot of the code from the mouse gravity demo, since almost all of it will apply here

    const init = () => {
		canvas.resetMouse()
		container.style.display = 'block'
		canvas.init()
    }
  
    const render = () => {
		// vector subtraction
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
