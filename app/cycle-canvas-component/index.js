import {pluck} from 'utils/operators'

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
