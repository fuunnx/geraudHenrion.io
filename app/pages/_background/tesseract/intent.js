import {prop} from 'ramda'

export function intent (selector) {
  return ({DOM, Time, Window}) => {
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

    const scrollTop$ = Window
      .events('scroll')
      // .compose(Time.throttleAnimation)
      .map(x => x.target.scrollingElement.scrollTop)

    const rotateX$ = scrollTop$.map(x => x/1000 * Math.PI)
      .startWith(0)

    return {
      canvasSize$,
      elapsedTime$,
      rotateX$,
    }
  }
}

export default intent
