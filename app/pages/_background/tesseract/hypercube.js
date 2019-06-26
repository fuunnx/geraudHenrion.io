import Shape from './Graph'
import {pipe} from 'ramda'
import {
  matrixTransform,
  rotateXYMatrix4,
  rotateZMatrix4,
  rotateXMatrix4,
  rotateYMatrix4,
} from './matrixUtils'

const {PI} = Math
const hypercube = Shape.hypercube()

export function hypercubeAnimationState (rotateX, step) {
  return hypercube
    .map(pipe(
      rotation(rotateX, step),
      otherTransforms,
    ))
}

export default hypercubeAnimationState

function rotation (rotateX, step) {
  return matrixTransform(
    rotateXMatrix4(step * 1 * PI),
    rotateXYMatrix4(step * 2 * PI + rotateX),
    rotateYMatrix4(rotateX),
    rotateZMatrix4(rotateX / 2),
  )
}

const otherTransforms = pipe(
  matrixTransform(
    rotateZMatrix4(PI/4),
    [
      [ 1, 0,  0, 0],
      [ 0, 1, .9, 0],
      [ 0, 0,  1, 0],
      [ 0, 0,  0, 1],
    ],
    rotateZMatrix4(PI/2),
  ),
  ([x, y, z, w]) => [x-.5, y, z+1, w+1],
  (xs) => xs.map(x => x/2),
  ([x, y, z, w]) => {
    const coeff = (-.5*w +1) * (-2/7*z +1)
    return [x * coeff, y * coeff]
  },
  ([x, y]) => [x * .522 + .025, y * .522],
)
