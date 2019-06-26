import {clearCanvas} from './clearCanvas'
import {drawRects} from './drawRects'
import {drawLines} from './drawLines'

export const drawOnCanvas = function canvasHandler (selector, sink$) {
  let canvas = document.querySelector(selector)
  let ctx = canvas ? canvas.getContext('2d') : null

  sink$
  .fold(([frame1, frame2], frame3) => ([frame2, frame3]), [{}, {}])
  .addListener({
    next: ([prev, next]) => {
      if (!canvas) {
        canvas = document.querySelector(selector)
        ctx = canvas ? canvas.getContext('2d') : null
      }
      if (canvas && ctx) {
        clearCanvas(ctx, prev)
        if (next.kind == 'rects') { drawRects(ctx, next) }
        if (next.kind == 'lines') { drawLines(ctx, next) }
      }
    },
    error: e => { throw e },
    complete: () => null,
  })
}
export default drawOnCanvas
