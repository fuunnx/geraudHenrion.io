import 'normalize.css/normalize.css'
import './global.css'

import {head, title, meta, link} from '@cycle/dom'
import {prop, replace} from 'ramda'

export default root
export function root (sources) {
  const {History, Modules} = sources
  const currentUrl$ = History
    .map(prop('pathname'))
    .map(replace('.html', ''))
    .map(route => route == '/' ? '/index' : route)

  const page$ = currentUrl$
    .map(Modules.get)
    .flatten()
    .map(page => page(sources))

  const vtree$ = page$
    .compose(extractKey('DOM'))

  const canvas$ = page$
    .compose(extractKey('Canvas'))

  const headvtree$ = page$
    .compose(extractKey('Title'))
    .map(x => head([
      meta({attrs: {charset: 'utf-8'}}),
      title(x),
      link({attrs: {
        href: 'https://fonts.googleapis.com',
        rel: 'preconnect',
      }}),
      link({attrs: {
        href: 'https://fonts.gstatic.com',
        rel: 'preconnect',
        crossorigin: true,
      }}),
      link({attrs: {
        href: 'https://fonts.googleapis.com/css?family=Catamaran:400,900&display=swap',
        rel: 'stylesheet',
      }}),
      link({attrs: {
        href: 'https://fonts.googleapis.com/css?family=Courier+Prime:400&display=swap',
        rel: 'stylesheet',
      }}),
    ]))
  return {
    Modules: currentUrl$,
    Head: headvtree$,
    Canvas: canvas$,
    DOM: vtree$,
  }
}


const extractKey = (key) => (stream$) => (
  stream$
    .map(prop(key))
    .filter(x => !!x)
    .flatten()
)
