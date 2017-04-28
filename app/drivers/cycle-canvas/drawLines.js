export function drawLines (ctx, { strokeStyle, lineWidth, children }) {
  ctx.save()
  ctx.beginPath()
  ctx.strokeStyle = strokeStyle
  ctx.lineWidth= lineWidth
  children.forEach(([from, to]) => {
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
  })
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}
export default drawLines
