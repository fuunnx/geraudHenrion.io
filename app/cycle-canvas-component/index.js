import {rect} from 'cycle-canvas'
import {h} from '@cycle/dom'
import {vnode} from 'utils/vnode'

function main({Props}) {
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


export const canvas = vnode(function ({selector, attributes, children}) {
  const tagName = 'cycle-canvas-component'
  const structure = children.length === 1 ? children[0] : rect(children)
  const attrs = {
    ...(attributes.attrs || {}),
    'data-fnx-structure': JSON.stringify(structure),
  }
  const result =  h(tagName + selector, {...attributes, attrs})
  return result
})
export default canvas
