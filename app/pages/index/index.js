import xs from 'xstream'
import {div} from '@cycle/dom'
import dot from 'utils/dot'
import styles from './index.css'
import Background from './background/background'


export default function HomePage (sources) {
  const background = Background(sources)


  return {
    Title: xs.of(`Géraud Henrion | Creative Web Developper`),
    DOM: xs.of(div([
      background({styles: {zIndex: 1}}),
      div(dot(styles.content), {styles: {zIndex: 2}}, []),
    ])),
  }
}
