import {div, h1} from '@cycle/dom'
import xs from 'xstream'

const header = (title) => h1([`Vous êtes sur la page ${title}`])

export function PageTemplate ({title, content}) {
  return (/*sources*/) => ({
    Title: xs.of(title),
    DOM: xs.of(div([
      header(title),
      div(content),
    ])),
  })
}
