import canvasPixelRatio from 'app/cycle-canvas-component/pixelRatio'
import {lines, rect} from 'app/cycle-canvas-component/cycle-canvas'
import {hypercubeAnimationState} from './hypercube'
import {canvas} from 'app/cycle-canvas-component'
import {pipe, min, max} from 'ramda'
import {vnode} from 'utils/vnode'
import xs from 'xstream'

export default function Tesseract ({DOM, Animation}) {
  return vnode(({selector, attributes: attributes_}) => {
    const attributes = {
      ...attributes_,
      attrs: {
        ...attributes_.attrs,
        'data-pixel-ratio': canvasPixelRatio,
      },
    }
    const size$ = DOM.select(selector)
      .events('resize')
      .map(x => x.target)
      .map(({clientWidth, clientHeight}) => ({
        width: clientWidth,
        height: clientHeight,
      }))
      .startWith({width: 320, height: 480}) // mostly for server-side rendering

    const config$ = xs.of({
      rotateXY: -1.6577,
      scale: 0.69,
      perspZ: 0.64,
      perspW: 0.10,
      offsetX: -0.06,
    })

    const nodes$ = xs
      .combine(size$, config$, Animation)
      .map(([size, config, {timestamp}]) =>
        model({...size, ...config})(timestamp)
      )

    const view$ = nodes$
      .map(xs => xs.map(pts => pts.map(([x, y]) => ({x, y}))))
      .map(xs => lines({
        lines: xs,
        x: 0,
        y: 0,
        style: {
          lineWidth: 2,
          strokeStyle: '#ffffff',
        },
      }))
      .map(x => rect({}, [x]))
      .map(view => canvas(selector, attributes, [view]))
      .startWith(canvas(selector, attributes, []))

    return view$
  })
}

const DURATION = 15000 //ms
const model = (config) => (delta) => {
  const step = (delta / DURATION) % 1
  const {width, height} = config
  const hypercube = hypercubeAnimationState(step)

  const initialState = hypercubeAnimationState(0)
  const illusHeight = measureHeight(initialState)
  const illusWidth = measureWidth(initialState)

  const size = (illusWidth / illusHeight > width / height)
    ? width
    : height * 1.01

  return [
    ...hypercube
      .map(pipe(
        ([x, y]) => [x * size, y * size],
        ([x, y]) => [x + width / 2, y + height / 2],
        ([x, y]) => [Math.round(x * canvasPixelRatio), Math.round(y * canvasPixelRatio)],
      ))
      .vertexs,
    horizontalLine({
      width: width * canvasPixelRatio,
      height: height * canvasPixelRatio,
    }),
  ]
}

const horizontalLine = ({width, height}) => (
  [[0, height/2], [width, height/2]]
)

function measureHeight ({joints}) {
  const ys = joints.map(([, y]) => y)

  const minY = ys.reduce(min, Infinity)
  const maxY = ys.reduce(max, -Infinity)

  return Math.abs(maxY - minY)
}

function measureWidth ({joints}) {
  const xs = joints.map(([x]) => x)

  const minX = xs.reduce(min, Infinity)
  const maxX = xs.reduce(max, -Infinity)

  return Math.abs(maxX - minX)
}
