import {h} from '@cycle/dom'

const steps = 8
const colors = [
  '#df422d',
  '#b63c2f',
  '#993831',
  '#7e3532',
  '#5f3034',
  '#462d35',
  '#2b2937',
  '#132638',
]

export const gradient = ({Time, Window}) => {
  const scrollTop$ = Window
    .events('scroll')
    // .compose(Time.throttleAnimation)
    .map(x => x.target.scrollingElement.scrollTop)
    .startWith(0)

  const bands$ = scrollTop$.map(amount =>
    Array(steps).fill()
      .map((_, index) => ({
        height: between([0, 100/8])(100 / steps - amount / 15 - (index-steps)),
        color: colors[index],
        y: 100 / steps * index,
      }))
    )

  return {
    DOM: bands$.map(bands => h('svg',
      {attrs: {width: '100%', height: '100%'}},
      bands
        .filter(({height}) => height > 0)
        .map(({height, color, y}) => (
        h('rect', {attrs: {
          width: '100%',
          height: `${height + .1}%`,
          fill: color,
          y: `${y}%`,
        }})
      )),
    )),
  }
}
export default gradient

const between = ([min, max]) => (value) =>
  Math.max(min, Math.min(max, value))
