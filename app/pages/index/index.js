import xs from 'xstream'
import {a, div} from '@cycle/dom'
import dot from 'utils/dot'
import styles from './index.css'
import Background from './background/background'


export default function HomePage (sources) {
  const background = Background(sources)


  return {
    Title: xs.of(`C'est la page d'bof`),
    DOM: xs.of(div([
      background({zIndex: 1}),
      div(dot(styles.content), {styles: {zIndex: 2}}, [
        `Home `,
        xs.periodic(100).map(x => a({props: {href: '/example.html'}}, ` -> vers le caca et au-delà !! ${x}`)),
      ]),
    ])),
  }
}
