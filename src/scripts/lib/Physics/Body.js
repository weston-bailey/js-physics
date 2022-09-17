const Vector = require('./Vector')

module.exports = class Body {
    constructor({ mass, location, velocity, acceleration, topSpeed }) {
        this.mass = mass || 1
        this.location = location || new Vector()
        this.velocity = velocity || new Vector()
        this.acceleration = acceleration || new Vector()
        this.topSpeed = topSpeed || 10
    }

    applyForce({ x, y }) {
        const force = new Vector(x, y).div({ x: this.mass, y: this.mass }) 
        this.acceleration.add(force)
    }

    update() {
        this.velocity.add(this.acceleration)
        this.velocity.max(this.topSpeed)
        this.location.add(this.velocity)
        this.acceleration.set({ x: 0, y: 0 })
        this.location.floor()
    }
}