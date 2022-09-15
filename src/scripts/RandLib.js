const { random, floor } = Math

const randomInRange = (min, max) => {
  return random() * (max - min) + min
}

const randomRGBHex = () => {
  // 256 ^ 3 colors possible
  return '#' + floor(random() * 16777215).toString(16)
}

const randomRGBAHex = () => {
  // 256 ^ 4 colorss possible
  return '#' + floor(random() * 4294967296).toString(16)
}


module.exports = {
  randomInRange,
  randomRGBHex,
  randomRGBAHex
}
