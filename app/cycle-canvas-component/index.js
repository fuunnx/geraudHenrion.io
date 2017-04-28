import {vnode} from 'utils/vnode'
import {h} from '@cycle/dom'

if (process.env.RUN_CONTEXT === 'browser') {
  require('document-register-element')
  const CycleCanvasComponent = require('./component').default
  document.registerElement(
    'cycle-canvas-component',
    CycleCanvasComponent,
    {extends: 'div'},
  )
}

export const canvas = vnode(({selector, attributes, children}) => (
  h(
    'cycle-canvas-component' + selector,
    attributes,
    children,
  )
))
export default canvas
