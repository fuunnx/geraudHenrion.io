import {div} from '@cycle/dom'
import Hero from './_hero'
import xs from 'xstream'

export default function HomePage (sources) {
  const hero = Hero(sources)
  return {
    Title: xs.of('Géraud Henrion | Creative Web Developper'),
    DOM: xs.of(div([hero.DOM])),
    Canvas: hero.Canvas,
  }
}
