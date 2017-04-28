import {addScopeToChildren} from './addScopeToChildren'
import {makeDOMDriver} from '@cycle/dom'

export default makeDOMHeadDriver
export function makeDOMHeadDriver (nameSpace, options) {
  return (pageHead$) => {
    const filteredHead$ = pageHead$
      .map(addScopeToChildren(nameSpace))

    filteredHead$
      .take(1)
      .addListener({
        next: cleanHead(nameSpace),
        error: err => { throw err },
        complete: () => {},
      })

    return makeDOMDriver('head', options)(filteredHead$)
  }
}

function cleanHead (nameSpace) {
  return () => {
    const head = document.querySelector('head')
    Array
      .from(document.querySelectorAll('head ' + nameSpace))
      .forEach(x => head.removeChild(x))
  }
}
