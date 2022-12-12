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

const createElement = require('./createElement.js')
const clearElement = require('./clearElement.js')

module.exports = demoArea => {
	// DOM setup
	const title = createElement('h2', demoArea, { innerText: 'Vectors'})
	const subText = createElement('p', demoArea, { innerText: 'that are attracted to where you click (right click to remove attractor)' })	

	const topDiv = createElement('div', demoArea)
	createElement('label', topDiv, { for: 'num-crawlers', innerText: 'Number of Elements:' })
	const numCrawlersInput = createElement('input', topDiv, { id: 'num-crawlers', type: 'number', value: 5000 })	
	createElement('label', topDiv, { for: 'top-speed', innerText: 'Top Speed:' })
	const topSpeedInput = createElement('input', topDiv, { id: 'top-speed', type: 'number', value: 30, step: 1 })
	createElement('label', topDiv, { for: 'shape', innerText: 'Shape:' })
	const shapeSelect = createElement('select', topDiv, { id: 'shape' })
	createElement('option', shapeSelect, { value: 'square', innerText: 'square' })
	createElement('option', shapeSelect, { value: 'circle', innerText: 'circle' })

	const middleDiv = createElement('div', demoArea)
	createElement('label', middleDiv, { for: 'min-mass', innerText: 'Minimum possible mass:' })
	const minMassInput = createElement('input', middleDiv, {  id: 'min-mass', type: 'number', value: 3, step: .5 })
	createElement('label', middleDiv, { for: 'max-mass', innerText: 'Maximum possible mass:' })
	const maxMassInput = createElement('input', middleDiv, {  id: 'max-mass', type: 'number', value: 5, step: .5 })	
	createElement('label', middleDiv, { for: 'gravity', innerText: 'Gravity:' })
	const gravityInput = createElement('input', middleDiv, {  id: 'gravity', type: 'number', value: 7, step: .5 })

	const bottomDiv = createElement('div', demoArea)
	createElement('label', bottomDiv, { for: 'random-colors', innerText: 'Random Colors' })
	const randomColorInput = createElement('input', bottomDiv, {  id: 'random-colors', type: 'checkbox' })
	createElement('label', bottomDiv, { for: 'vector-color', innerText: 'Vector Colors' })
	const vectorColorInput = createElement('input', bottomDiv, {  id: 'vector-color', type: 'color' })
	createElement('label', bottomDiv, { for: 'bg-color', innerText: 'Background Color:' })
	const bgColorInput = createElement('input', bottomDiv, {  id: 'bg-color', type: 'color', value: '#FFFFFF' })

	const resetButton = createElement('button', demoArea, { id: 'reset-button', innerText: 'Reset Canvas' })

	// shared values
    const canvas = new Canvas({ parent: '#demo-area' })
    let bgColor = bgColorInput.value
    let gravity = new Gravity({ gravity: .5 })
	const maxAttractors = 6
	let clickCooldown = false
	let attractors = []
    let crawlers = []

    const init = () => {
        crawlers = []
		attractors = []
        gravity = new Gravity({
            gravity: Number(gravityInput.value),
            maxStrength: 50
        })
        bgColor = bgColorInput.value
        canvas.resetMouse()
        canvas.init()

        let CrawlerShape = RectangleAxisAligned
        switch (shapeSelect.value) {
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

        for (let i = 0; i < Number(numCrawlersInput.value); i++) {
            const mass = randomInRange(Number(minMassInput.value), Number(maxMassInput.value))
            crawlers.push(new CrawlerShape({
					mass,
					location: new Vector(randomInRange(0, canvas.width), randomInRange(0, canvas.height)),
					acceleration: new Vector(-0.001, 0.01),
					color: randomColorInput.checked ? randomRGBAHex() : vectorColorInput.value,
					// prepared for either circles or squares
					width: 1.5 * mass,
					height: 1.5 * mass,
					radius: 1.5 * mass,
					topSpeed: Number(topSpeedInput.value) / mass
				})
            )
        }
    }

    const render = () => {
        // vector subtraction
        canvas.clear()
        canvas.background(bgColor)
        // const mouseBody = new Body({ location: canvas.mouse, mass: 10 })
		const [left, middle, right] = canvas.mouseClick
		if (left && !clickCooldown) {
			console.log(vectorColorInput.value)
			clickCooldown = true
			setTimeout(() => clickCooldown = false, 250)
			const body = new Circle({
				mass: 10,
				location: canvas.mouse,
				// 7F = 127
				color: randomColorInput.checked ? randomRGBHex() + '7F' : vectorColorInput.value + '7F',
				radius: 50,
			})  

			attractors.push({ body, gravity })
			if (attractors.length > maxAttractors) {
				attractors.shift()
			}
		}
		
		attractors.forEach(attractor => { 
			attractor.body.render(canvas.ctx)
		})

        crawlers.forEach((crawler, i) => {
            // subtracting where we want to go from where we are
			const forces = attractors.map(attractor => attractor.gravity.calculate(attractor.body, crawler))
			// console.log(forces)
            // const gravForce = gravity.calculate(mouseBody, crawler)
            // if (canvas.mouseClick[0]) {
            //     gravForce.mult({ x: -1, y: -1 })
            // }
			forces.forEach(force => crawler.applyForce(force))
            // crawler.applyForce(gravForce)
            crawler.update()
            crawler.render(canvas.ctx)
        })
    }

	resetButton.addEventListener('click', () => {
        canvas.cancelRender()
        init()
        canvas.render(render)
    })

    init()
    canvas.render(render)

    return () => {
        canvas.cancelRender()
		clearElement(demoArea)
    }
}
