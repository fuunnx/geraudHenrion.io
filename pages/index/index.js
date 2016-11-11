import xs from 'xstream'
import {a, div, canvas, img} from '@cycle/dom'


export default function HomePage () {
  return {
    Title: xs.of(`C'est la page d'accueil`),
    DOM: xs.of(div([
      background(),
      `Ici = Je sais `,
      a({props: {href: '/example.html'}}, ` -> vers page d'example`),
    ])),
  }
}

function background () {
  return div('.background', [
    steppedGradient(8, '#fff', '#000'),
    canvas('.glitch'),
    img('.myHead', {props: {src: '/assets/head.svg'}}),
    img('.tesseract', {props: {src: '/assets/logotype.svg'}}),
    img('.punchline', {props: {src: '/assets/introduction.svg'}}),
  ])
}

function steppedGradient (steps) {
  return div('.gradient',
    [...Array(steps)].map(() => div('.row'))
  )
}
