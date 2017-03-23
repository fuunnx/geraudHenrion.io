import xs from 'xstream'
import {div, a} from '@cycle/dom'
import styles from './_hero.css'
import Background from './_background/background'
import resumeUrl from './CV-Geraud-Henrion.pdf' // TODO solve special chars in urls

import makeLocaleRule from 'utils/makeLocaleRule'
const c = makeLocaleRule(styles)

export default function Hero (sources) {
  const background = Background(sources)

  return {
    DOM: xs.of(div([
      background({styles: {zIndex: 1}}),
      div(c('content'), {styles: {zIndex: 2}}, [
        a(c('button'), {attrs: {href: resumeUrl, target: '_blank'}}, [
          'Get my resume (FR)',
        ]),
        div(c('socialLinks'), [
          a(c('socialLink'), {attrs: {href: 'mailto:geraud.henrion@gmail.com', target: '_blank'}}, [
            'geraud.henrion@gmail.com',
          ]),
          a(c('socialLink'), {attrs: {href: 'https://twitter.com/GeraudHenrion', target: '_blank'}}, [
            '@GeraudHenrion',
          ]),
          a(c('socialLink'), {attrs: {href: 'https://github.com/fuunnx', target: '_blank'}}, [
            'Github',
          ]),
        ]),
      ]),
    ])),
  }
}
