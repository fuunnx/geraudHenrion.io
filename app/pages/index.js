import xs from 'xstream'
import {div} from '@cycle/dom'
import Hero from './_hero'


export default function HomePage (sources) {
  const hero = Hero(sources)
  return {
    Title: xs.of('Géraud Henrion | Creative Web Developper'),
    DOM: xs.of(div([
      hero.DOM,
    ])),
  }
}
