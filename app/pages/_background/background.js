import makeLocaleRule from 'utils/makeLocaleRule'
import punchline from '../_img/introduction.svg'
import tesseractImg from 'assets/logo.svg.js'
import {div, img, span} from '@cycle/dom'
import myHead from '../_img/head.svg'
import styles from './background.css'
import Glitch from './glitch/glitch'
import Tesseract from './Tesseract'
import gradient from './gradient'
import {vnode} from 'utils/vnode'

const c = makeLocaleRule(styles)

export default function Background (sources) {
  const glitch = Glitch(sources)
  const tesseract = Tesseract(sources)
  
  return vnode(({selector}) =>
    div(selector + c('background'), [
      div(c('gradient'), [gradient]),
      glitch(c('glitch')),
      img(c('myHead'), {props: {src: myHead}}),
      ((sources.Context == 'browser')
        ? tesseract(c('tesseractAnimation'))
        : span(c('tesseractSvg'), {props: {innerHTML: tesseractImg}})
      ),
      img(c('punchline'), {props: {src: punchline}}),
    ])
  )
}
