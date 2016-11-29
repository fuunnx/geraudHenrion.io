import {canvas} from 'app/cycle-canvas-component'
import {rect, text} from 'cycle-canvas'
import {listener} from 'utils/listener'
import xs from 'xstream'
import concat from 'xstream/extra/concat'


export default function Glitch ({DOM}) {
  return function (selector, attrs = {}) {
    const resize$ = DOM.select(selector)
      .events('resize')
      .map(x => x.target)
      .map(({clientWidth, clientHeight}) => ({
        width: clientWidth,
        height: clientHeight,
      }))

    const state$ = concat(
        xs.of({width: 320, height: 480}),
        resize$,
      )
      .map(({width, height}) => model({width, height}))

    const Animation = xs.periodic(17)
    const view$ = xs.combine(state$, Animation)
      .map(([fn, n]) => (n % 2 === 0) ? fn() : [])
      .map(xs => rect({}, xs))
      .debug()


    return view$.map(view => canvas(selector, attrs, [view]))

  }
}

const model = ({width, height}) => (model) => {
  const area = width * height

  return [
    rect(randomRect({width, height})),
    rect(randomRect({width, height})),
    rect(randomRect({width, height})),
  ].map(x => ({
    ...x,
    draw: [{fill: '#ffffff'}],
  }))
}


const shuffle = (seed) => (array) => {

}

function randomRect ({width, height}) {
  const width_ = Math.round(Math.random() * 15 + 1)
  const height_ = Math.round(Math.random() * 3 + 1)
  const x = Math.round(Math.random() * width - width_/2)
  const y = Math.round(Math.random() * height - height_/2)
  return {x, y, width: width_, height: height_}
}
