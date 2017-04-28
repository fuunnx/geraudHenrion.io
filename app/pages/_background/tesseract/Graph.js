export default Graph

function Graph (joints, vertexs) {
  Object.assign(
    this,
    {
      joints,
      vertexs,
    },
  )
  return this
}

Object.assign(
  Graph.prototype,
  {
    getVertexs () {
      return this.vertexs.map(
        ([from, to]) => [this.joints[from], this.joints[to]]
      )
    },
    map (fn) {
      return new Graph(
        mapValues(fn)(this.joints),
        this.vertexs,
      )
    },
    mapKeys (fn) {
      return new Graph(
        mapKeys(fn)(this.joints),
        this.vertexs.map(xs => xs.map(fn)),
      )
    },
    concat (graph) {
      return new Graph(
        Object.assign({}, this.joints, graph.joints),
        this.vertexs.concat(graph.vertexs),
      )
    },
  }
)

const extrude = (shape) => {
  return concat(
    shape
      .map((pt) => [...pt, -1])
      .mapKeys((key) => key + 'a'),
    shape
      .map((pt) => [...pt,  1])
      .mapKeys((key) => key + 'b'),
    new Graph(
      {},
      Object.keys(shape.joints)
        .map(key => [
          key + 'a',
          key + 'b',
        ])
    )
  )
}

Graph.of = ({joints = {}, vertexs = []}) => new Graph(joints, vertexs)
Graph.empty = () => Graph.of({joints: {}, vertexs: []})
Graph.point = () => Graph.of({joints: {a: []}, vertexs: []})
Graph.dimensionPrimitive = (dimensions) => {
  // primitive(1) == point
  // primitive(1) == line
  // primitive(2) == square
  // primitive(3) == cube
  // primitive(4) == hypercube
  if (dimensions == 0) {
    return Graph.point()
  } else {
    return extrude(Graph.dimensionPrimitive(dimensions - 1))
  }
}

Graph.hypercube = () => Graph.dimensionPrimitive(4)

function concat (first, ...concatables) {
  return concatables.reduce(
    (acc, x) => acc.concat(x), first
  )
}

function mapKeys (fn) {
  return (obj) => (
    Object
    .keys(obj)
    .reduce(
      (acc, key) => (acc[fn(key)] = obj[key], acc),
      {},
    )
  )
}

function mapValues (fn) {
  return (obj) => (
    Object
    .keys(obj)
    .reduce(
      (acc, key) => (acc[key] = fn(obj[key]), acc),
      {},
    )
  )
}
