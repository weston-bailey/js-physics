require('../styles/index.css')
const demos = require('./demos')



document.addEventListener('DOMContentLoaded', () => {
  let cleanUp = demos.mouseGravity()
  document.querySelector('#demo-select').addEventListener('change', e => {
    cleanUp()
      if (e.target.value in demos) {
        cleanUp = demos[e.target.value]()
      } else {
        const errorDiv = document.querySelector('#error')
        errorDiv.innerText = `[error] cannot show demo: ${e.target.value}`
        errorDiv.style.display = 'block'
        cleanUp = () => errorDiv.style.display = 'none'
      }
  })

})