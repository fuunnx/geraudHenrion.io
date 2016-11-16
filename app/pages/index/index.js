import xs from 'xstream'
import {a, div, canvas, img} from '@cycle/dom'
import dot from 'utils/dot'
import styles from './index.css'
import myHead from './head.svg'
import tesseract from './logotype.svg'
import punchline from './introduction.svg'

export default function HomePage () {

  return {
    Title: xs.of(`C'est la page d'bof`),
    DOM: xs.of(div([
      background({zIndex: 1}),
      div(dot(styles.content), {styles: {zIndex: 2}}, [
        `Home `,
        a({props: {href: '/example.html'}}, ` -> vers le caca et au-delà !!`),
      ]),
    ])),
  }
}


function background (zIndex) {
  return div(dot(styles.background), {styles: {zIndex}}, [
    steppedGradient(),
    canvas('.glitch'),
    // img('.myHead', {props: {src: myHead}}),
    // img('.tesseract', {props: {src: tesseract}}),
    img('.punchline', {props: {src: punchline}}),
  ])
}

function steppedGradient () {
  const steps = 8
  const colors = [
    '#df422d',
    '#b63c2f',
    '#993831',
    '#7e3532',
    '#5f3034',
    '#462d35',
    '#2b2937',
    '#132638',
  ]
  return div(dot(styles.gradient),
    [...Array(steps)].map((_, index) =>
      div(dot(styles.row), {style: {'background-color': colors[index]}})
    )
  )
}
