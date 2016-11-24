import {div, canvas, img} from '@cycle/dom'
import dot from 'utils/dot'
import styles from './background.css'
import myHead from './img/head.svg'
import tesseract from './img/logotype.svg'
import punchline from './img/introduction.svg'

import gradient from './gradient'


const makeRule = (rules) => (className) => dot(rules[className])
const c = makeRule(styles)

export default function background (zIndex) {
  return div(dot(styles.background), {styles: {zIndex}}, [
    div(c('gradient'), [gradient]),
    canvas(c('glitch'), {props: {width: '100%', height: '100%'}}),
    img(c('myHead'), {props: {src: myHead}}),
    img(c('tesseract'), {props: {src: tesseract}}),
    img(c('punchline'), {props: {src: punchline}}),
  ])
}
