require('../styles/index.css')
const demos = require('./demos')
const clearElement = require('./demos/clearElement.js')

document.addEventListener('DOMContentLoaded', () => {
	const demoArea = document.querySelector('#demo-area')
	const demoSelect = document.querySelector('#demo-select')
	let cleanUp = demos[demoSelect.value](demoArea)
	demoSelect.addEventListener('change', e => {
		cleanUp()
		if (e.target.value in demos) {
			cleanUp = demos[e.target.value](demoArea)
		} else {
			const errorDiv = document.querySelector('#error')
			demoArea.innerText = `[error] cannot show demo: ${e.target.value}`
			errorDiv.style.display = 'block'
			cleanUp = () => clearElement(demoArea)
		}
	})
})
