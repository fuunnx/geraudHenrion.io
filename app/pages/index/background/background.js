import {div, img} from '@cycle/dom'
import dot from 'utils/dot'
import styles from './background.css'
import myHead from '../img/head.svg'
import tesseract from '../img/logotype.svg'
import punchline from '../img/introduction.svg'

import gradient from './gradient'
import Glitch from './glitch/glitch'


const makeRule = (rules) => (className) => dot(rules[className])
const c = makeRule(styles)

export default function Background (sources) {
  const glitch = Glitch(sources)

  return zIndex =>
    div(dot(styles.background), {styles: {zIndex}}, [
      div(c('gradient'), [gradient]),
      glitch(c('glitch')),
      img(c('myHead'), {props: {src: myHead}}),
      img(c('tesseract'), {props: {src: tesseract}}),
      img(c('punchline'), {props: {src: punchline}}),
    ])
}
