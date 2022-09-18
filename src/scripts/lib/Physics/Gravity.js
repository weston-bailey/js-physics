const Vector = require("./Vector")
const { clamp } = require('../Utils')

module.exports = class Gravity {
    constructor({ gravity, minDistance, maxDistance }) {
        this.gravity = gravity
        this.minDistance = minDistance || 5
        this.maxDistance = maxDistance || 25
    }
    
    calculate(attractor, body) {
        // subtracting where we want to go from where to are
        const force = Vector.sub(attractor.location, body.location)
        const distance = clamp(force.mag(), this.minDistance, this.maxDistance)
        const strength = (this.gravity * attractor.mass * body.mass) / (distance * distance)
        force.mult({ x: strength, y: strength })
        force.normalize()
        // console.log('distance', distance, 'strength', strength, 'x', force.x, 'y', force.y)
        return force 
    }
}