import {canvas} from 'app/cycle-canvas-component'
import {vnode} from 'utils/vnode'
import {intent} from './intent'
import {model} from './model'
import {view} from './view'

import xs from 'xstream'

export default function Tesseract (sources) {
  return vnode(({selector, attributes: attributes_}) => {
    const canvasPixelRatio = 1
    const attributes = {
      ...attributes_,
      attrs: {
        ...attributes_.attrs,
        'data-pixel-ratio': canvasPixelRatio,
      },
    }

    const model$ = model(intent(selector)(sources))
    const view$ = view({selector, canvasPixelRatio})(model$)

    return {
      DOM: xs.of(canvas(selector, attributes, [])),
      Canvas: view$,
    }
  })
}
