import {pluck} from 'utils/operators'
import xs from 'xstream'
import customElementify from './customElementify'
import {rect, text} from 'cycle-canvas'

function main({props}) {
  return {
    Canvas: props.compose(pluck('data-view')),
  }
}


if (process.env.RUN_CONTEXT === 'browser') {
  const customElementClass = customElementify(main)
  document.registerElement('cycle-canvas-component', {prototype: customElementClass})
}
const canvasRender$ = xs.of(
  rect({
    x: 10,
    y: 10,
    width: 160,
    height: 100,
    draw: [
      {fill: 'purple'},
    ],
    children: [
      text({
        x: 15,
        y: 25,
        value: 'Hello World!',
        font: '18pt Arial',
        draw: [
          {fill: 'white'},
        ],
      }),
    ],
  })
)
