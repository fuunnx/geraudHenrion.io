import {prop} from 'ramda'

export function intent (selector) {
  return ({DOM, Time}) => {
    const size$ = DOM
      .select(selector)
      .events('resize')
      .map(prop('target'))
      .map(({clientWidth, clientHeight}) => ({
        width: clientWidth,
        height: clientHeight,
      }))
      .startWith({width: 320, height: 480})

    const multiplier$ = Time
      .animationFrames()
      .fold((x) => x+1, 0)
      .filter(x => x%5 == 0)
      .map(x => x/5)
      .map(x => Math.sin(x/5) * Math.sin(x/3) * 3)

    return {
      size$,
      multiplier$,
    }
  }
}

export default intent
