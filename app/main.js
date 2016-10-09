import 'normalize.css/normalize.css'
import {div, img, a} from '@cycle/dom'
import {prop, head} from 'ramda'

import imageMoi from 'assets/moi.jpg'

export function main ({Pages, History}) {
  const pathname$ = History.map(prop('pathname'))
  const vnode$ = pathname$
    .map(url => Pages.get(url))
    .flatten()
    .map(head)
    .map(({content}) => div([
      content,
      div([a({attrs: {href: '/work'}}, 'work ->')]),
      img({attrs: {src: `/${imageMoi}`}}),
    ]))


  return {
    DOM: vnode$,
  }
}
export default main
