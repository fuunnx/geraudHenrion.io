import xs from 'xstream'
import 'normalize.css/normalize.css'
import {div, img, a} from '@cycle/dom'
import {prop} from 'ramda'
import {headTag, meta, stylesheet, title, script} from 'utils/tags'

import imageMoi from 'assets/moi.jpg'

export function main ({Cache, History}) {
  const pathname$ = History.map(prop('pathname'))

  const body$ = pathname$
    .map(url => Cache.select(url))
    .flatten()
    .map(({content}) => div([
      div([content, a({attrs: {href: '/work'}}, 'work ->')]),
      img({attrs: {src: `/${imageMoi}`}}),
      script([`window.initialState = ${JSON.stringify({})}`]),
    ]))


  const head$ = xs.of(headTag([
    meta({charset: `utf-8`}),
    stylesheet(`/styles.css`),
    title('Géraud Henrion | Creative developper'),
  ]))

  return {
    DOM: body$,
    Head: head$,
    Cache: pathname$,
  }
}
export default main
