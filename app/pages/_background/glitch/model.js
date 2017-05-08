import xs from 'xstream'

export const model = ({size$, multiplier$}) => (
  xs.combine(
    size$,
    multiplier$,
  )
  .map(([size, multiplier]) => (randomRects(15)(size, multiplier)))
)
export default model

const randomRects = (quantity) => (...args) => (
  Array(quantity).fill()
    .map(() => randomRect(...args))
)

function randomRect (size, multiplier) {
  const width = randomInt(15 * multiplier + 1)
  const height = randomInt(3 * multiplier + 2 - width / 15)
  const x = randomInt(size.width)
  const y = randomInt(size.height)

  return {
    x: Math.round(x - (width / 2)),
    y: Math.round(y - (height / 2)),
    width,
    height,
  }
}

function randomInt (max) {
  return Math.round(
    Math.random() * max
  )
}
