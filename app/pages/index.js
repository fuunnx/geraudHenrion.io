import makeLocaleRule from 'utils/makeLocaleRule'
import styles from './index.css'
import {div} from '@cycle/dom'
import Hero from './_hero'
import xs from 'xstream'

const c = makeLocaleRule(styles)

export default function HomePage (sources) {
  const scrollTop$ = sources.Window
    .events('scroll')
    .map(x => x.target.scrollingElement.scrollTop)
    .startWith(0)
    .debug('scrollTop')

  const windowHeight$ = sources.Window
    .events('resize')
    .startWith('')
    .mapTo(sources.Window.elements())
    .flatten()
    .map(x => x.innerHeight)
    .debug('windowHeight')

  const timeline$ = xs.combine(scrollTop$, windowHeight$)
    .map(([scrollTop, windowHeight]) => scrollTop / windowHeight)
    .compose(sources.Time.throttleAnimation)

  const hero = Hero({...sources, timeline$})

  return {
    Title: xs.of('Géraud Henrion | Creative Web Developper'),
    DOM: xs.combine(hero.DOM)
      .map(([$hero]) => div(c('container'), [
        div(c('hero-wrapper'), [$hero]),
        div(c('content-wrapper'), [
          div(c('content', [])),
        ]),
      ])),
    Canvas: hero.Canvas,
  }
}
