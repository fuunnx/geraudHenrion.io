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
        xs.of({width: 0, height: 0}),
        resize$,
      )
      .map(({width, height}) => rect({
        x: (width - 160) / 2,
        y: (height - 100) / 2,

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

    return state$.map(state => canvas(selector, attrs, [state]))

  }
}
