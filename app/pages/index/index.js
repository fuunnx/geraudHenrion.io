import xs from 'xstream'
import {a, div, canvas, img} from '@cycle/dom'
import myHead from './head.svg'
import tesseract from './logotype.svg'
import punchline from './introduction.svg'

export default function HomePage () {
  return {
    Title: xs.of(`C'est la page d'bof`),
    DOM: xs.of(div([
      background(),
      `Home `,
      a({props: {href: '/example.html'}}, ` -> vers le caca et au-delà !!`),
    ])),
  }
}

function background () {
  return div('.background', [
    // steppedGradient(8, '#fff', '#000'),
    canvas('.glitch'),
    // img('.myHead', {props: {src: myHead}}),
    // img('.tesseract', {props: {src: tesseract}}),
    img('.punchline', {props: {src: punchline}}),
  ])
}

function steppedGradient (steps) {
  return div('.gradient',
    [...Array(steps)].map(() =>
      div('.row', {style: {
        'background-color': '#eee',
        'width': '100%',
      }})
    )
  )
}
