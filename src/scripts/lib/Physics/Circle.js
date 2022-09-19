// const Vector = require('./Vector')
const Body = require('./Body')
const { TWO_PI } = require('../Defs')

module.exports = class Circle extends Body {
    constructor({ mass, location, velocity, acceleration, topSpeed, radius, lineWidth, color }) {
        // physics
        super({ mass, location, velocity, acceleration, topSpeed })
        // size
        this.radius = radius
        // rendering
        this.lineWidth = lineWidth || 2
        this.color = color
    }

    get center() {
        return this.location.copy()
    }

    render(ctx) {
        ctx.lineWidth = this.lineWidth
        ctx.strokeStyle = this.color
        ctx.beginPath()
        ctx.arc(this.location.x, this.location.y, this.radius, 0, TWO_PI)
        ctx.closePath()
        ctx.stroke()
    }
}