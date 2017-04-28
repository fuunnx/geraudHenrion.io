import makeLocaleRule from 'utils/makeLocaleRule'
import punchline from '../_img/introduction.svg'
import tesseractImg from 'assets/logo.svg.js'
import {div, img, span} from '@cycle/dom'
import myHead from '../_img/head.svg'
import styles from './background.css'
import Tesseract from './tesseract'
import gradient from './gradient'
import {vnode} from 'utils/vnode'
import Glitch from './glitch'
import xs from 'xstream'

const c = makeLocaleRule(styles)

export default function Background (sources) {
  const glitch = Glitch(sources)(c('glitch'))
  const tesseract = Tesseract(sources)(c('tesseractAnimation'))

  return {
    DOM: xs.combine(
      glitch.DOM,
      tesseract.DOM,
    )
    .map(renderBackground(sources.Context)),
    Canvas: xs.merge(
      glitch.Canvas,
      tesseract.Canvas,
    ),
  }
}

function renderBackground (Context) {
  return ([glitch, tesseract]) => vnode(({selector}) => (
    div(selector + c('background'), [
      div(c('gradient'), [gradient]),
      glitch,
      img(c('myHead'), {props: {src: myHead}}),
      ((Context == 'browser')
        ? tesseract
        : span(c('tesseractSvg'), {props: {innerHTML: tesseractImg}})
      ),
      img(c('punchline'), {props: {src: punchline}}),
    ])
  ))
}
