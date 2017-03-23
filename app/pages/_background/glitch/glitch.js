import {canvas} from 'app/cycle-canvas-component'
import {rect} from 'cycle-canvas'
import {vnode} from 'utils/vnode'
import xs from 'xstream'
import {map} from 'ramda'

export default function Glitch ({DOM, Animation}) {
  return vnode(({selector, attributes}) => {
    const resize$ = DOM.select(selector)
      .events('resize')
      .map(x => x.target)
      .map(({clientWidth, clientHeight}) => ({
        width: clientWidth,
        height: clientHeight,
      }))
      .startWith({width: 320, height: 480})

    const state$ = resize$
      .map(({width, height}) => model({width, height}))

    // const Animation = xs.periodic(80)
    const counter$ = Animation.fold((x) => x+1, 0)
      .filter(x => x%5 == 0)
      .map(x => x/5)
    const nodes$ = xs.combine(state$, counter$)
      .map(([fn, n]) => fn(Math.sin(n/5) * Math.sin(n/3) * 10))


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

const model = ({width, height}) => (multiplier) => {
  return [...Array(10)].map(() => randomRect({width, height}, multiplier))
}

function randomRect ({width, height}, multiplier) {
  const width_ = Math.round(Math.random() * 15 * multiplier + 1)
  const height_ = Math.round(Math.random() * 3 * multiplier + 2 - width_ / 15)
  const x = Math.round(Math.random() * width)
  const y = Math.round(Math.random() * height)
  const transformations = [
      {translate: {x, y}},
  ]
  return {
    x: Math.round(-width_ / 2),
    y: Math.round(-height_ / 2),
    width: width_, height: height_, transformations}
}
