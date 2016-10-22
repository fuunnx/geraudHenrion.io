import {makeDOMDriver} from '@cycle/dom'


export function makeHeadDriver () {
  return (pageHead$) => {
    var $head = document.querySelector('head')
    // $head.innerHTML = '' // eslint-disable-line
    makeDOMDriver('head')(pageHead$)
  }
}
