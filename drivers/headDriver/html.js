import {makeHTMLDriver} from '@cycle/dom'
import {scopeChildren} from './scopeChildren'
import {reduceComponents} from './reduceComponents'

export default makeHTMLHeadDriver
export function makeHTMLHeadDriver (nameSpace, cb) {
  return (pageHead$, XStreamAdapter, name) => {
    const filteredHead$ = pageHead$
      .map(scopeChildren(nameSpace))
    makeHTMLDriver(cb)(filteredHead$, XStreamAdapter, name)
  }
}
