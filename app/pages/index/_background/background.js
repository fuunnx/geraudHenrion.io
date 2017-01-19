import {div, img, span} from '@cycle/dom'
import {vnode} from 'utils/vnode'
import styles from './background.css'
import myHead from '../_img/head.svg'
import tesseract from 'assets/logo.svg.js'
import punchline from '../_img/introduction.svg'

import gradient from './gradient'
import Glitch from './glitch/glitch'

import makeLocaleRule from 'utils/makeLocaleRule'
const c = makeLocaleRule(styles)

export default function Background (sources) {
  const glitch = Glitch(sources)

  return vnode(({selector}) =>
    div(selector + c('background'), [
      div(c('gradient'), [gradient]),
      glitch(c('glitch')),
      img(c('myHead'), {props: {src: myHead}}),
      span(c('tesseract'), {props: {innerHTML: tesseract}}),
      // h1(c('punchline'), [
      //   div(`Hello my name is`),
      //   div(`Géraud Henrion`),
      //   div(`and I'm a creative Web Developper`),
      // ]),
      img(c('punchline'), {props: {src: punchline}}),
    ])
  )
}
