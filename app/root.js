import {prop} from 'ramda'
import 'normalize.css/normalize.css'
import {head, title, meta, h} from '@cycle/dom'
import {rect, text} from 'cycle-canvas'
import 'app/cycle-canvas-component'
import xs from 'xstream'

// const {Sitemap, Head, DOM, Module, History} = sources
export default root
export function root (sources) {
  const {History, Modules, Animation} = sources
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

  const canvasRender$ = xs.of(
    rect({
      x: 10,
      y: 10,
      width: 160,
      height: 100,
      draw: [
        {fill: 'purple'},
      ],
      children: [
        text({
          x: 15,
          y: 25,
          value: 'Hello World!',
          font: '18pt Arial',
          draw: [
            {fill: 'white'},
          ],
        }),
      ],
    })
  )


  return {
    Modules: loadModule$,
    DOM: xs.of(h('cycle-canvas-component')),
    Head: headvtree$,
    Canvas: canvasRender$,
  }
}
