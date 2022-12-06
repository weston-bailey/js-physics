module.exports = (type, parent, props, methods) => {
    // create the element
    const newEl = document.createElement(type)
    // set the properties
    for (const prop in props) {
        newEl[prop] = props[prop]
    }
    // add to DOM
    parent.append(newEl)

    return newEl
}
