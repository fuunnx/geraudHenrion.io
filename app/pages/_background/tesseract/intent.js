import {prop} from 'ramda'

export function intent (selector) {
  return ({DOM, Time}) => {
    const canvasSize$ = DOM
      .select(selector)
      .events('resize')
      .compose(Time.throttleAnimation)
      .map(prop('target'))
      .map(({clientWidth, clientHeight}) => ({
        width: clientWidth,
        height: clientHeight,
      }))

    const elapsedTime$ = Time.animationFrames().map(prop('time'))

    return {
      canvasSize$,
      elapsedTime$,
    }
  }
}

export default intent
