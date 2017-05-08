export const matrixTransform = (...matrixs) => {
  var matrix = []

  if(matrixs.length == 1) {
    matrix = matrixs[0]
  } else {
    matrix = matrixs.reduceRight(matrixMultiply)
  }

  return (point) => {
    if (matrix.length < point.length) throw `\
Error:
Matrix and point must have the same dimension: given matrix has ${matrix.length} but given point has ${point.length}`

    return point.map((_, row) =>
      point.reduce(
        (acc, n, col) => acc + n * matrix[row][col],
        0,
      )
    )
  }
}

export const matrixMultiply = (m1, m2) => {
  return m1.map((_, i) =>
    m2.map((_, j) =>
      m1.reduce(
        (acc, _, k) => acc + m1[i][k] * m2[k][j],
        0,
      )
    )
  )
}

export function rotateXYMatrix4(angle = 0) {
  const s = Math.sin(angle)
  const c = Math.cos(angle)
  return [
    [1, 0, 0,  0],
    [0, 1, 0,  0],
    [0, 0, c, -s],
    [0, 0, s,  c],
  ]
}

export function rotateXMatrix4(angle = 0) {
  const s = Math.sin(angle)
  const c = Math.cos(angle)
  return [
    [1, 0,  0, 0],
    [0, c, -s, 0],
    [0, s,  c, 0],
    [0, 0,  0, 1],
  ]
}
export function rotateZMatrix4(angle = 0) {
  const s = Math.sin(angle)
  const c = Math.cos(angle)
  return [
    [c, -s, 0, 0],
    [s,  c, 0, 0],
    [0,  0, 1, 0],
    [0,  0, 0, 1],
  ]
}
export function rotateYMatrix4(angle = 0) {
  const s = Math.sin(angle)
  const c = Math.cos(angle)
  return [
    [ c, 0, 0, s],
    [ 0, 1, 0, 0],
    [ 0, 0, 1, 0],
    [-s, 0, 0, c],
  ]
}
