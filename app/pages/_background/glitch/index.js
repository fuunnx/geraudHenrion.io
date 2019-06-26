import {canvas} from 'app/cycle-canvas-component'
import {rects} from 'drivers/canvasDriver'
import {vnode} from 'utils/vnode'
import {intent} from './intent'
import {model} from './model'
import xs from 'xstream'

export default function Glitch ({DOM, Time}) {
  return vnode(({selector, attributes: attributes_}) => {
    const attributes = {
      ...attributes_,
      attrs: {
        ...attributes_.attrs,
        'data-pixel-ratio': 1,
      },
    }

    const model$ = model(intent(selector)({DOM, Time}))
    const view$ = model$
      .map(xs => rects({
        selector: `${selector} canvas`,
        children: xs,
        fillStyle: '#ffffff',
      }))

    return {
      DOM: xs.of(canvas(selector, attributes, [])),
      Canvas: view$,
    }
  })
}
