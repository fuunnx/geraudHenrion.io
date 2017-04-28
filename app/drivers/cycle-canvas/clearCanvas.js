import {min, max} from 'ramda'

export const clearCanvas = (ctx, prev) => {
  if (prev.kind == 'rects') {
    prev.children.forEach(({x, y, width, height}) => (
      ctx.clearRect(x, y, width, height)
    ))
  }

  if (prev.kind == 'lines') {
    const points = prev.children.reduce((xs, x) => xs.concat(x), [])
    const {x, y, width, height} = boundingRect(points)
    const r = (x) => Math.round(x)
    ctx.clearRect(r(x-5), r(y-5), r(width+10), r(height+10))
  }
}
export default clearCanvas

function boundingRect (points) {
  const initialValues = {
    minX: Infinity, minY: Infinity,
    maxX: -Infinity, maxY: -Infinity,
  }
  const {minX, minY, maxX, maxY} = points
    .reduce(({minX, minY, maxX, maxY}, {x, y}) => ({
      minX: min(minX, x),
      minY: min(minY, y),
      maxX: max(maxX, x),
      maxY: max(maxY, y),
    }), initialValues)

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  }
}
