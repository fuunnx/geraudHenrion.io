import {prop} from 'ramda'
import 'normalize.css/normalize.css'
import {head, title, meta} from '@cycle/dom'

import {rect} from 'cycle-canvas'
import xs from 'xstream'
import concat from 'xstream/extra/concat'

// const {Sitemap, Head, DOM, Module, History} = sources
export default root
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

  const state$ = concat(
      xs.of({width: 0, height: 0}),
      xs.of({width: 220, height: 220}),
    )
    .debug()
    .map(({width, height}) => rect({
      x: (width - 160) / 2,
      y: (height - 100) / 2,

      width: 160,
      height: 100,

      draw: [
        {fill: 'purple'},
      ],
    })
  )

  return {
    Modules: loadModule$,
    DOM: vtree$,
    Head: headvtree$,
  }
}
