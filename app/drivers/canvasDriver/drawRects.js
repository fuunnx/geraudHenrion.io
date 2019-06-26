export function drawRects (ctx, {fillStyle, children}) {
  ctx.save()
  ctx.beginPath()
  ctx.fillStyle = fillStyle
  children.forEach(({x, y, width, height}) => {
    ctx.rect(x, y, width, height)
  })
  ctx.fill()
  ctx.closePath()
  ctx.restore()
}
export default drawRects
