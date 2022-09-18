const Vector = require('../Physics/Vector')

module.exports = class Mouse {
  constructor({ element, startingVector }) {
    this.element = element
    this.isOver = false
    // [left, middle, right]
    this.isClicking = [false, false, false]
    this.startingVector = startingVector
    this.location = startingVector.copy() || new Vector()
    
    this.element.addEventListener('mouseenter', e => {
      this.isOver = true
    })

    this.element.addEventListener('mouseleave', e => {
      this.isOver = false
    })

    this.element.addEventListener('mousemove', e => {
      if (this.isOver) {
        this.location.set({ x: e.offsetX, y: e.offsetY })
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

  reset() {
    this.location = this.startingVector.copy()
    console.log(this.location)
    this.isClicking = [false, false, false]
    this.isOver = false
    return this
  }
}