import {makeDOMDriver} from '@cycle/dom'
import {listener} from 'utils/listener'
import {reduceComponents} from './reduceComponents'
import {scopeChildren} from './scopeChildren'

export default makeDOMHeadDriver
export function makeDOMHeadDriver (nameSpace, options) {
  return (pageHead$) => {
    const filteredHead$ = pageHead$
      .map(scopeChildren(nameSpace))

    filteredHead$
      .take(1)
      .addListener(listener(cleanHead(nameSpace)))

    return makeDOMDriver('head', options)(filteredHead$)
  }
}

function cleanHead (nameSpace) {
  return () => {
    const head = document.querySelector('head')
    const children = document.querySelectorAll('head ' + nameSpace)
    ;[...children].forEach(x => head.removeChild(x))
  }
}
