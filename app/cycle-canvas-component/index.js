import sampleCombine from 'xstream/extra/sampleCombine'
import {rect} from 'cycle-canvas'
import {h} from '@cycle/dom'


function main({Props, Animation}) {
  const state$ = Props
    .filter(x => !!x)
    .map(x => x['data-fnx-structure'])
    .filter(x => !!x)
    .map(JSON.parse)

  return {
    Canvas: state$,
  }
}

if (process.env.RUN_CONTEXT === 'browser') {
  require('document-register-element')
  const customElementify = require('./customElementify').default
  const CustomElementClass = customElementify(main)
  document.registerElement(
    'cycle-canvas-component',
    CustomElementClass,
    {extends: 'div'},
  )
}


export const canvas = function (...args) {
  const tagName = 'cycle-canvas-component'
  const {selector, attributes, children} = identifyArgs(tagName)(...args)
  const structure = children.length === 1 ? children[0] : rect(children)
  const attrs = {
    ...(attributes.attrs || {}),
    'data-fnx-structure': JSON.stringify(structure),
  }
  const result =  h(selector, {...attributes, attrs})
  return result
}
export default canvas


function identifyArgs (tagName) {
  return (first, b, c) => {
    let selector = tagName
    let attributes = {}
    let children = []

    if (isSelector(first)) {
      selector = tagName + first
      if (b && c) (attributes = b, children = c)
      if (b && Array.isArray(b) && !c) (children = b)
      if (b && !Array.isArray(b) && !c) (attributes = b)
    }
    if (!isSelector(first)) {
      selector = tagName
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
}

function isValidString(param) {
  return typeof param === 'string' && param.length > 0
}

function isSelector(param) {
  return isValidString(param) && (param[0] === '.' || param[0] === '#')
}
