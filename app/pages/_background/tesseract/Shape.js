import {memoize} from 'ramda'

const Shape = ({joints = [], vertexs = []}) => {
  return {
    joints,
    vertexs,
    map: (fn) => Shape.of({
      joints: joints.map(fn),
      vertexs: vertexs.map(pts => pts.map(fn)),
    }),
    concat: (shape) => Shape.of({
      joints: joints.concat(shape.joints),
      vertexs: vertexs.concat(shape.vertexs),
    }),
  }
}
Shape.of = Shape
Shape.empty = () => Shape.of({vertexs: [], joints: []})
Shape.point = () => Shape.of({vertexs: [], joints: [[]]})
Shape.primitive = memoize((dimensions) => {
  // primitive(1) == point
  // primitive(1) == line
  // primitive(2) == square
  // primitive(3) == cube
  // primitive(4) == hypercube
  if (dimensions == 0) {
    return Shape.point()
  } else {
    return extrude(Shape.primitive(dimensions - 1))
  }
})

Shape.hypercube = () => Shape.primitive(4)

const extrude = (shape) => {
  return concat(
    shape.map(pt => [...pt, -1]),
    shape.map(pt => [...pt, 1]),
    Shape.of({
      vertexs: shape.joints.map(pt => [
        [...pt, -1], [...pt, 1],
      ]),
    })
  )
}

export {Shape}
export default Shape


const concat = (first, ...concatables) =>
  concatables.reduce(
    (acc, x) => acc.concat(x), first
  )
