require('../styles/index.css')
const { 
  Vector, 
  Canvas, 
  RectangleAxisAligned, 
  randomInRange, 
  randomRGBAHex 
} = require('./lib')

document.addEventListener('DOMContentLoaded', main)

function main() {
  const vSubCanvas = new Canvas({ parent: '#vector-sub' })
  
  const crawlers = []

  for (let i = 0; i < 5000; i++) {
    crawlers.push(new RectangleAxisAligned({ 
        mass: 1,
        location: new Vector(randomInRange(0, vSubCanvas.width), randomInRange(0, vSubCanvas.height)),
        acceleration: new Vector(-0.001, 0.01),
        color: randomRGBAHex(),
        width: 10,
        height: 10
      })
    )
  }

  const render = () => {
    // vector subtraction
    vSubCanvas.clear()
    crawlers.forEach((crawler, i) => {
        // subtracting where we want to go from where to are
        const direction = Vector.sub(vSubCanvas.mouse, crawler.location)
        direction.normalize()
        direction.mult({ x: .5, y: .5 })
        if (vSubCanvas.mouseClick[0]) {
          direction.mult({ x: -1, y: -1 })
        }
        crawler.applyForce(direction)  

        crawler.update()
        crawler.render(vSubCanvas.ctx)
    })

    requestAnimationFrame(render)
  }
  render() 
}
