const Vector = require("./Vector")
const { clamp } = require('../Utils')

module.exports = class Gravity {
    constructor({ gravity, minDistance, maxDistance, minStrength, maxStrength }) {
        this.gravity = gravity
        this.minDistance = minDistance || 5
        this.maxDistance = maxDistance || 25
        this.minStrength = minStrength || .1
        this.maxStrength = maxStrength || 10
    }
    
    calculate(attractor, body) {
        // subtracting where we want to go from where to are
        const force = Vector.sub(attractor.location, body.location)
        const distance = clamp(force.mag(), this.minDistance, this.maxDistance)
        const strength = clamp((this.gravity * attractor.mass * body.mass) / (distance * distance), this.minStrength, this.maxStrength)
        force.normalize()
        force.mult({ x: strength, y: strength })
        // console.log('distance', distance, 'strength', strength, 'x', force.x, 'y', force.y)
        return force 
    }
}