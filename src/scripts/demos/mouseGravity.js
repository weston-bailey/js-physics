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
    const canvas = new Canvas({ parent: '#mouse-gravity' })
    const container = document.querySelector('#mouse-gravity-display')
    let bgColor = '#FFFFFF'
    let gravity = new Gravity({ gravity: .5 })
    let crawlers = []
  
    const init = () => {
      crawlers = []
      const numCrawlers = Number(document.querySelector('#num-crawlers').value)
      const minMass = Number(document.querySelector('#min-mass').value)
      const maxMass = Number(document.querySelector('#max-mass').value)
      const topSpeed = Number(document.querySelector('#top-speed').value)
      gravity = new Gravity({ 
        gravity: Number(document.querySelector('#gravity').value),
        maxStrength: 50
      })
      const randomColors = document.querySelector('#random-colors').checked
      const shape = document.querySelector('#shape')
      const inputColor = document.querySelector('#color').value
      bgColor = document.querySelector('#bg-color').value
      canvas.resetMouse()
      container.style.display = 'block'
      canvas.init()
  
      for (let i = 0; i < numCrawlers; i++) {
        const mass = randomInRange(minMass, maxMass)
        let CrawlerShape = RectangleAxisAligned
        switch (shape.value) {
          case 'square':
            CrawlerShape = RectangleAxisAligned
            break
          case 'circle':
            CrawlerShape = Circle
            break
          default:
            CrawlerShape = RectangleAxisAligned
            console.warn(`unknown shape type ${shape.value}`)
        }
        crawlers.push(new CrawlerShape({ 
            mass,
            location: new Vector(randomInRange(0, canvas.width), randomInRange(0, canvas.height)),
            acceleration: new Vector(-0.001, 0.01),
            color: randomColors ? randomRGBAHex() : inputColor,
            // prepared for either circles or squares
            width: 1.5 * mass,
            height: 1.5 * mass,
            radius: 1.5 * mass,
            topSpeed: topSpeed / mass
          })
        )
      }
    }
  
    const render = () => {
      // vector subtraction
      canvas.clear()
      canvas.background(bgColor)
      crawlers.forEach((crawler, i) => {
          // subtracting where we want to go from where to are
          const gravForce = gravity.calculate(new Body({ location: canvas.mouse, mass: 10}), crawler)
          if (canvas.mouseClick[0]) {
            gravForce.mult({ x: -1, y: -1 })
          }
  
          crawler.applyForce(gravForce)  
          crawler.update()
          crawler.render(canvas.ctx)
      })
    }
  
    document.getElementById('reset').addEventListener('click', () => {
      canvas.cancelRender()
      init()
      canvas.render(render)
    })
  
    init()
    canvas.render(render)
  
    return () => {
      container.style.display = 'none'
      canvas.cancelRender()
      canvas.parent.removeChild(canvas.canvas)
    }
  }