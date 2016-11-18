import {div, canvas, img} from '@cycle/dom'
import dot from 'utils/dot'
import styles from './background.css'
import myHead from './img/head.svg'
import tesseract from './img/logotype.svg'
import punchline from './img/introduction.svg'

import gradient from './gradient'

export default function background (zIndex) {
  return div(dot(styles.background), {styles: {zIndex}}, [
    div(dot(styles.gradient), [gradient]),
    canvas('.glitch'),
    img(dot(styles.myHead), {props: {src: myHead}}),
    img('.tesseract', {props: {src: tesseract}}),
    img('.punchline', {props: {src: punchline}}),
  ])
}
