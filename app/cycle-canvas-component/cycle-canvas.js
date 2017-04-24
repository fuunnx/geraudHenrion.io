import XStreamAdapter from '@cycle/xstream-adapter'
import {min, max} from 'ramda'
import xs from 'xstream'

export function c (kind, opts, children) {
  if (opts.children) {
    children = opts.children
  }

  return Object.assign(
    {},
    opts,
    {kind, children}
  )
}

export function rects (opts, children) {
  return c('rects', opts, children)
}

export function lines (opts, children) {
  return c('lines', opts, children)
}

export function makeCanvasDriver (selector, {width = 340, height = 480}) {
  let canvas = selector  // eslint-disable-line
  if (typeof canvas === 'string') {
    canvas = document.querySelector(selector)
  }

  if (!canvas) {
    canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
  }

  canvas.width = width //eslint-disable-line
  canvas.height = height //eslint-disable-line

  const context = canvas.getContext('2d')

  // http://www.html5rocks.com/en/tutorials/canvas/hidpi/?redirect_from_locale=fr
  const devicePixelRatio = window.devicePixelRatio || 1
  const backingStoreRatio = context.webkitBackingStorePixelRatio
    || context.mozBackingStorePixelRatio
    || context.msBackingStorePixelRatio
    || context.oBackingStorePixelRatio
    || context.backingStorePixelRatio || 1

  const ratio = devicePixelRatio / backingStoreRatio
  context.scale(ratio, ratio)

  let driver = function canvasDriver (sink$) { //eslint-disable-line
    sink$
    .fold(([frame1, frame2], frame3) => ([frame2, frame3]), [{}, {}])
    .addListener({
      next: ([prev, next]) => {
        if (prev.kind == 'rects') {
          prev.children.forEach(({x, y, width, height}) => {
            context.clearRect(x, y, width, height)
          })
        }
        if (prev.kind == 'lines') {
          const points = next.children.reduce((xs, x) => xs.concat(x), [])
          const {x, y, width, height} = boundingRect(points)
          const r = (x) => Math.round(x)
          context.clearRect(r(x-5), r(y-5), r(width+10), r(height+10))
        }

        if (next.kind == 'rects') {
          context.fillStyle = next.fillStyle
          next.children.forEach(({x, y, width, height}) => {
            context.fillRect(x, y, width, height)
          })
        }
        if (next.kind == 'lines') {
          context.beginPath()
          context.strokeStyle = next.strokeStyle
          next.children.forEach(([from, to]) => {
            context.moveTo(from.x, from.y)
            context.lineTo(to.x, to.y)
          })
          context.stroke()
          context.closePath()
        }
      },
      error: e => { throw e },
      complete: () => null,
    })

    return xs.empty()
  }

  driver.streamAdapter = XStreamAdapter //eslint-disable-line
  return driver
}

function boundingRect (points) {
  const xs = points.map(({x}) => x)
  const minX = xs.reduce(min, Infinity)
  const maxX = xs.reduce(max, -Infinity)

  const ys = points.map(({y}) => y)
  const minY = ys.reduce(min, Infinity)
  const maxY = ys.reduce(max, -Infinity)

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  }
}
