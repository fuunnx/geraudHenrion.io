export const vnode = (fn) => (...args) => fn(identifyArgs(...args))
export default vnode

function identifyArgs (first, b, c) {
  let selector = ''
  let attributes = {}
  let children = []

  if (isSelector(first)) {
    selector = first
    if (b && c) (attributes = b, children = c)
    if (b && Array.isArray(b) && !c) (children = b)
    if (b && !Array.isArray(b) && !c) (attributes = b)
  }
  if (!isSelector(first)) {
    if(first && b) (attributes = first, children = b)
    if (first && Array.isArray(first) && !b) (children = first)
    if (first && !Array.isArray(first) && !b) (attributes = first)
  }

  return {
    selector,
    attributes,
    children,
  }
}

function isValidString(param) {
  return typeof param === 'string' && param.length > 0
}

function isSelector(param) {
  return isValidString(param) && (param[0] === '.' || param[0] === '#')
}
