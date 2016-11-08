import xs from 'xstream'
import {a, div} from '@cycle/dom'


export default function HomePage (sources) {
  return {
    Title: xs.of(`C'est la page d'accueil`),
    DOM: xs.of(div([
      `Ici = Accueil `,
      a({props: {href: '/example.html'}}, ` -> vers page d'example`),
    ])),
  }
}
