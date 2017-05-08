import Background from './_background/background'
// TODO solve special chars in urls
import makeLocaleRule from 'utils/makeLocaleRule'
import resumeUrl from './CV-Geraud-Henrion.pdf'
import {div, a} from '@cycle/dom'
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
    div(c('content'), {style: {'z-index': 4}}, [
      externalLink(c('button'), resumeUrl, [
        'Get my resume (FR)',
      ]),
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
