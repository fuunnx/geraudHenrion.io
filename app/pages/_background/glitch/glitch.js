import {canvas} from 'app/cycle-canvas-component'
import {vnode} from 'utils/vnode'
import {rect} from 'cycle-canvas'
import {map} from 'ramda'
import xs from 'xstream'

export default function Glitch ({DOM, Animation}) {
  return vnode(({selector, attributes: attributes_}) => {
    const pixelRatio = 1
    const attributes = {
      ...attributes_,
      attrs: {
        ...attributes_.attrs,
        'data-pixel-ratio': pixelRatio,
      },
    }

    const resize$ = DOM.select(selector)
      .events('resize')
      .map(x => x.target)
      .map(({clientWidth, clientHeight}) => ({
        width: clientWidth,
        height: clientHeight,
      }))
      .startWith({width: 320, height: 480})

    const state$ = resize$
      .map(({width, height}) => model({width, height, pixelRatio}))

    const counter$ = Animation.fold((x) => x+1, 0)
      .filter(x => x%5 == 0)
      .map(x => x/5)

    const nodes$ = xs.combine(state$, counter$)
      .map(([fn, n]) => fn(Math.sin(n/5) * Math.sin(n/3) * 3))

    const view$ = nodes$
      .map(map(x => rect({
        ...x,
        draw: [{fill: '#fff'}],
      })))
      .map(xs => rect({}, xs))
      .map(view => canvas(selector, attributes, [view]))

    return view$
  })
}

const model = ({width, height, pixelRatio}) => (multiplier) => (
  [...Array(15)].map(() => randomRect({width, height, pixelRatio}, multiplier))
)

function randomRect ({width, height, pixelRatio}, multiplier) {
  const width_ = Math.round(Math.random() * 15 * multiplier + 1)
  const height_ = Math.round(Math.random() * 3 * multiplier + 2 - width_ / 15)
  const x = Math.round(Math.random() * width * pixelRatio)
  const y = Math.round(Math.random() * height * pixelRatio)
  const transformations = [
    {translate: {x, y}},
  ]

  return {
    x: Math.round(-width_ / 2 * pixelRatio),
    y: Math.round(-height_ / 2 * pixelRatio),
    width: width_ * pixelRatio,
    height: height_ * pixelRatio,
    transformations,
  }
}
