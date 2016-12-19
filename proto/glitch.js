import R from 'ramda'

console.clear()
const $canvas = document.querySelector('canvas')
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
$canvas.width = WIDTH
$canvas.height = HEIGHT
const ctx = $canvas.getContext('2d')

window.setInterval(worldGenerator(ctx), 100)

function worldGenerator (ctx) {
  let state = {
    rects: [],
  }
  return () => {
    state = {
      rects: shuffle(state.rects)
        .slice(0, Math.floor(state.rects.length * 9 / 10))
        .concat(R.range(0, 2).map(randomRect)),
    }
    clear()
    window.setTimeout(() => draw(ctx)(state), 10)

  }
}

function draw(ctx) {
  return ({rects}) => {
    clear()
    rects.map(drawRect(ctx))
  }
}

function drawRect (ctx) {
  return ({x, y, width, height}) => {
    ctx.fillStyle = 'rgba(255,255,255,1)',
    ctx.fillRect(
      Math.round(x - width/2),
      Math.round(y - height/2),
      Math.round(width),
      Math.round(height),
    )
  }
}

function randomRect () {
  const x = Math.random() * WIDTH
  const y = Math.random() * HEIGHT
  const width = Math.random() * 15 + 1
  const height = Math.random() * 3 + 1 - width / 15
  return {x, y, width, height}
}

function shuffle(array) {
  let counter = array.length

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter)

    // Decrease counter by 1
    counter--

    // And swap the last element with it
    let temp = array[counter]
    array[counter] = array[index]
    array[index] = temp
  }

  return array
}

function clear () {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
}
