import {hypercubeAnimationState} from './hypercube'
import {min, max} from 'ramda'
import xs from 'xstream'

const DURATION = 15000 // ms
export const model = ({canvasSize$, elapsedTime$, rotateX$}) => {
  const canvasPixelRatio = 1
  const initialState = Object.values(hypercubeAnimationState(0, 0).joints)

  const {width: illusWidth, height: illusHeight} = boundingRect(initialState)

  const scale$ = canvasSize$
    .map(({width, height}) => (
      (illusWidth / illusHeight > width / height)
        ? width
        : height * 1.01
    ))

  const position$ = canvasSize$
    .map(({width, height}) => ({
      x: width / 2,
      y: height / 2,
    }))

  return xs
    .combine(scale$, position$, elapsedTime$, rotateX$)
    .map(([scale, position, time, rotateX]) =>
      animation(scale * canvasPixelRatio, position, time, rotateX)
    )
}

function animation (scale, location, time, rotateX) {
  const step = (time / DURATION) % 1
  const hypercube = hypercubeAnimationState(rotateX, step)

  return hypercube
    .map(([x, y]) => ({
      x: (x * scale + location.x),
      y: (y * scale + location.y),
    }))
    .getVertexs()
}

function boundingRect (points) {
  const initialValues = {
    minX: Infinity, minY: Infinity,
    maxX: -Infinity, maxY: -Infinity,
  }

  const {minX, minY, maxX, maxY} = points
    .reduce(({minX, minY, maxX, maxY}, [x, y]) => ({
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

export default model
