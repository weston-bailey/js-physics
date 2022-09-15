require('../styles/index.css')
const Vector = require('./Vector')
const Canvas = require('./Canvas')
const Crawler = require('./Crawler')
const { randomInRange, randomRGBAHex } = require('./RandLib')

document.addEventListener('DOMContentLoaded', main)

function main() {
  const vSubCanvas = new Canvas({ parent: '#vector-sub' })
  
  const crawlers = []

  for (let i = 0; i < 10000; i++) {
    crawlers.push(new Crawler({ 
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
    crawlers.forEach(crawler => {
      crawler.enqueueUpdate(c => {
        const direction = Vector.sub(vSubCanvas.mouse, c.location)
        direction.normalize()
        direction.mult({ x: .5, y: .5 })
        if (vSubCanvas.mouseClick) {
          direction.mult({ x: -1, y: -1 })
        }
        c.acceleration = direction
      })

      crawler.update()
      crawler.render(vSubCanvas.ctx)
    })

    requestAnimationFrame(render)
  }
  render() 
}
