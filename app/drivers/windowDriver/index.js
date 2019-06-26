import fromEvent from 'xstream/extra/fromEvent'
import xs from 'xstream'

export function makeWindowDriver () {
  return () => ({
    elements: () => xs.of(window),
    events: (eventName) => fromEvent(window, eventName),
  })
}
export function mockWindowDriver () {
  return () => ({
    elements: () => xs.empty(),
    events: () => xs.empty(),
  })
}
export default makeWindowDriver
