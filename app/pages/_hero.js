import Background from './_background/background'
// TODO solve special chars in urls
import makeLocaleRule from 'utils/makeLocaleRule'
import {div, a, span, br, h1} from '@cycle/dom'
import styles from './_hero.css'

const c = makeLocaleRule(styles)

export default function Hero (sources) {
  const background = Background(sources)

  return {
    DOM: background.DOM.map(renderHero),
    Canvas: background.Canvas,
  }
}

function renderHero (background) {
  return div(c('hero'), [
    background({style: {'z-index': 1}}),
    div(c('content'), {style: {'z-index': 5}}, [
      renderPunchline(),
      div(c('afterButton')),
      div(c('socialLinks'), [
        externalLink(c('socialLink'), 'mailto:geraud.henrion@gmail.com', [
          'geraud.henrion@gmail.com',
        ]),
        externalLink(c('socialLink'), 'mailto:geraud.henrion@gmail.com', [
          '@GeraudHenrion',
        ]),
      ]),
    ]),
  ])
}

function externalLink (selector, href, children) {
  return a(
    selector,
    {attrs: {href, target: '_blank'}},
    children,
  )
}

function renderPunchline () {
  return h1(c('punchline'), [
    span(c('punchline-hello'), [
      'Hello, my name is', br(),
    ]),
    span(c('punchline-name'), [
      'Géraud Henrion', br(),
    ]),
    span(c('punchline-title'), [
      'and I\'m a ', span('Crazy'), ' Creative Web Developper',
    ]),
  ])
}
