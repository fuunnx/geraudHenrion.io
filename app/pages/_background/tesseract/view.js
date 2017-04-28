import {lines} from 'drivers/cycle-canvas'

export const view = ({selector, canvasPixelRatio}) => (model$) => (
  model$
  .map(xs => lines({
    selector: `${selector} canvas`,
    children: xs,
    strokeStyle: '#ffffff',
    lineWidth: canvasPixelRatio,
  }))
)


export default view
