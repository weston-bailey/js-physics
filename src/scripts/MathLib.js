const clamp = (x, low, high) => {
  if (x > high) {
    x = high
  } else if (x < low) {
    x = low
  }
  return x
}

const max = (x, max) => x > max ? max : x

const min = (x, min) => x < min ? min : x

module.exports = {
  clamp,
  max,
  min
}
