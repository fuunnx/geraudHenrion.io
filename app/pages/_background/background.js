import makeLocaleRule from 'utils/makeLocaleRule'
import {div, img, span} from '@cycle/dom'
import tesseractImg from 'assets/logo.svg.js'
import styles from './background.css'
import Tesseract from './tesseract'
import Gradient from './gradient'
import {vnode} from 'utils/vnode'
import myHead from './head.svg'
import Glitch from './glitch'
import xs from 'xstream'

const c = makeLocaleRule(styles)

export default function Background (sources) {
  const glitch = Glitch(sources)(c('glitch'))
  const tesseract = Tesseract(sources)(c('tesseractAnimation'))
  const gradient = Gradient(sources)

  const scrollTop$ = sources.Window
    .events('scroll')
    // .compose(sources.Time.throttleAnimation)
    .map(x => x.target.scrollingElement.scrollTop)
    .startWith(0)

  const scale$ = scrollTop$.map(x => Math.max(1 - Math.pow(x/700, 2), 0))
  const opacity$ = scrollTop$.map(x => 1 - (x-100)/500)


  return {
    DOM: xs.combine(
      scale$,
      opacity$,
      glitch.DOM,
      tesseract.DOM,
      gradient.DOM,
    )
    .map(renderBackground(sources.Context)),
    Canvas: xs.merge(
      glitch.Canvas,
      tesseract.Canvas,
    ),
  }
}

function renderBackground (Context) {
  return ([scale, opacity, $glitch, $tesseract, $gradient]) => vnode(({selector}) => (
    div(selector + c('background'), [
      div(c('gradient'), [$gradient]),
      ((Context == 'browser') ? $glitch : ''),
      img(c('myHead'), {
        props: {src: myHead},
        style: {transform: `scale(${scale})`, opacity},
      }),
      ((Context == 'browser')
        ? $tesseract
        : span(c('tesseractSvg'), {props: {innerHTML: tesseractImg}})
      ),
    ])
  ))
}
