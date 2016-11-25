import {pluck} from 'utils/operators'
import {h} from '@cycle/dom'

function main({props}) {
  return {
    Canvas: props
      .compose(pluck('data-structure'))
      .map(JSON.parse),
  }
}

if (process.env.RUN_CONTEXT === 'browser') {
  require('document-register-element')
  const customElementify = require('./customElementify').default
  const CustomElementClass = customElementify(main)
  document.registerElement(
    'cycle-canvas-component',
    CustomElementClass,
    {extends: 'canvas'},
  )
}


export const canvas = identifyArgs('cycle-canvas-component')
export default canvas

// export function canvas (sel, attrs, structure) {
//   return createTagFunction('cycle-canvas-component')
//
// }

function identifyArgs (tagName) {
  return (first, b, c) => {
    let selector = tagName
    let attrs = null
    let children = null

    if (isSelector(first)) {
      selector = tagName + first
      if (b && c) (attrs = b, children = c)
      if (b && Array.isArray(b) && !c) (children = b)
      if (b && !Array.isArray(b) && !c) (attrs = b)
      if (!b && !c) (attrs = {})
    }
    if (!isSelector(first)) {
      selector = tagName
      if(first && b) (attrs = first, children = b)
      if (first && Array.isArray(first) && !b) (children = first)
      if (first && !Array.isArray(first) && !b) (attrs = first)
      if(!first && !b) (attrs = {})
    }

    return {
      selector,
      attrs,
      children,
    }
  }
}

function isValidString(param) {
  return typeof param === 'string' && param.length > 0
}

function isSelector(param) {
  return isValidString(param) && (param[0] === '.' || param[0] === '#')
}
