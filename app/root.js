import {prop} from 'ramda'
import 'normalize.css/normalize.css'
import {head, title, meta} from '@cycle/dom'

// const {Sitemap, Head, DOM, Module, History} = sources
export function root (sources) {
  const {History, Modules} = sources
  const currentUrl$ = History.map(prop('pathname'))
    .map(path => path.replace('.html', ''))
  const loadModule$ = currentUrl$

  const page$ = currentUrl$
    .map(route => Modules.get(route))
    .flatten()
    .map(pageComponent => pageComponent(sources))

  const vtree$ = page$.map(x => x.DOM)
    .filter(x => !!x)
    .flatten()

  const headvtree$ = page$.map(x => x.Title)
    .filter(x => !!x)
    .flatten()
    .map(x => head([
      meta({attrs: {charset: 'utf-8'}}),
      title(x),
    ]))

  return {
    Modules: loadModule$,
    DOM: vtree$,
    Head: headvtree$,
  }
}
