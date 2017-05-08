import {addScopeToChildren} from './addScopeToChildren'
import {makeHTMLDriver} from '@cycle/dom'

export default makeHTMLHeadDriver
export function makeHTMLHeadDriver (nameSpace, cb) {
  return (pageHead$, XStreamAdapter, name) => {
    const filteredHead$ = pageHead$
      .map(addScopeToChildren(nameSpace))

    makeHTMLDriver(cb)(filteredHead$, XStreamAdapter, name)
  }
}
