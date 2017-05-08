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

export const gradient = h('svg',
  {attrs: {width: '100%', height: '100%'}},
  Array(steps)
    .fill()
    .map((_, index) => (
      h('rect', {attrs: {
        width: '100%',
        height: `${100/8 + .1}%`,
        fill: colors[index],
        y: `${100/8 * index}%`,
      }})
    ),
  ),
)
export default gradient
