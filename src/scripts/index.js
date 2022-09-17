require('../styles/index.css')
const { 
  Vector, 
  Canvas, 
  RectangleAxisAligned, 
  Gravity,
  randomInRange, 
  randomRGBAHex,
  Body, 
} = require('./lib')

document.addEventListener('DOMContentLoaded', main)

function main() {
  const vSubCanvas = new Canvas({ parent: '#vector-sub' })
  const gravity = new Gravity(.5)
  const crawlers = []

  for (let i = 0; i < 5000; i++) {
    const mass =randomInRange(1, 5)
    crawlers.push(new RectangleAxisAligned({ 
        mass,
        location: new Vector(randomInRange(0, vSubCanvas.width), randomInRange(0, vSubCanvas.height)),
        acceleration: new Vector(-0.001, 0.01),
        color: randomRGBAHex(),
        width: 2 * mass,
        height: 2 * mass,
        topSpeed: 20 / mass
      })
    )
  }

  const render = () => {
    // vector subtraction
    vSubCanvas.clear()
    crawlers.forEach((crawler, i) => {
        // subtracting where we want to go from where to are
        const gravForce = gravity.calculate(new Body({ location: vSubCanvas.mouse, mass: 1}), crawler)
        // const direction = Vector.sub(vSubCanvas.mouse, crawler)
        if (vSubCanvas.mouseClick[0]) {
          gravForce.mult({ x: -1, y: -1 })
        }
        crawler.applyForce(gravForce)  
        crawler.update()
        crawler.render(vSubCanvas.ctx)
    })

    requestAnimationFrame(render)
  }
  render() 
}
