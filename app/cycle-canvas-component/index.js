import {rect} from 'cycle-canvas'
import {vnode} from 'utils/vnode'
import {h} from '@cycle/dom'
const CYCLE_CANVAS_STRUCTURE_CHANGE = 'cycleCanvasStructureChange'

function main({View}) {
  const state$ = View
    .filter(x => !!x)

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

let elems = {}

export const canvas = vnode(function ({selector, attributes, children}) {
  const tagName = 'cycle-canvas-component'
  const structure = children.length === 1 ? children[0] : rect(children)
  const attrs = {
    ...(attributes.attrs || {}),
  }

  const result =  h(
    tagName + selector,
    {
      ...attributes,
      attrs,
      hook: {insert},
    },
  )

  if(elems[selector]) {
    const event = new CustomEvent(
      CYCLE_CANVAS_STRUCTURE_CHANGE,
      {
        detail: structure,
        bubbles: false,
      },
    )
    elems[selector].dispatchEvent(event)
  }

  return result

  function insert({elm}) {
    elems[selector] = elm
  }
})
export default canvas
