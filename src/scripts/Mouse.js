const Vector = require('./Vector')

module.exports = class Mouse {
  constructor({ element }) {
    this.element = element
    this.isOver = false
    this.position = new Vector()
    
    this.element.addEventListener('mouseenter', e => {
      this.isOver = true
    })

    this.element.addEventListener('mouseleave', e => {
      this.isOver = false
      this.position.set({ x: 0, y: 0 })
    })

    this.element.addEventListener('mousemove', e => {
      if (this.isOver) {
        this.position.set({ x: e.offsetX, y: e.offsetY })
      }
    })
  }
}







