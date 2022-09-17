const Vector = require("./Vector")

module.exports = class Gravity {
    constructor(gravity) {
        this.gravity = gravity
    }
    
    calculate(attractor, body) {
        // subtracting where we want to go from where to are
        const force = Vector.sub(attractor.location, body.location)
        const distance = force.mag()
        const strength = (this.gravity * attractor.mass * body.mass) / (distance * distance)
        force.mult({ x: strength, y: strength })
        force.normalize()
        // console.log('distance', distance, 'strength', strength, 'x', force.x, 'y', force.y)
        return force 
    }
}