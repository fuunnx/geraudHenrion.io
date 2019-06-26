import {lines} from 'drivers/canvasDriver'

export const view = ({selector, canvasPixelRatio}) => (model$) => (
  model$.map(xs => lines({
    selector: `${selector} canvas`,
    children: xs,
    strokeStyle: '#ffffff',
    lineWidth: canvasPixelRatio,
  }))
)


export default view
