const Vector = require('../Physics/Vector')

module.exports = class Mouse {
  constructor({ element }) {
    this.element = element
    this.isOver = false
    // [left, middle, right]
    this.isClicking = [false, false, false]
    this.position = new Vector()
    
    this.element.addEventListener('mouseenter', e => {
      this.isOver = true
    })

    this.element.addEventListener('mouseleave', e => {
      this.isOver = false
      // this.position.set({ x: 0, y: 0 })
    })

    this.element.addEventListener('mousemove', e => {
      if (this.isOver) {
        this.position.set({ x: e.offsetX, y: e.offsetY })
      }
    })

    this.element.addEventListener('mousedown', e => {
      this.isClicking[e.button] = true
    })

    
    this.element.addEventListener('mouseup', e => {
      this.isClicking[e.button] = false
    })
    // disables center and right click mouse behavior
    this.element.addEventListener('contextmenu', e => {
      e.preventDefault()
      return false
    }, false)
  }
}







