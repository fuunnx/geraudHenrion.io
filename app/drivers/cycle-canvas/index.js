import XStreamAdapter from '@cycle/xstream-adapter'
import {drawOnCanvas} from './drawOnCanvas'
import xs from 'xstream'

export function rects (opts) {
  return {
    ...opts,
    kind: 'rects',
  }
}

export function lines (opts) {
  return {
    ...opts,
    kind: 'lines',
  }
}

export function makeCanvasDriver () {
  const driver = function canvasDriver (sink$) {
    const dict = {}

    sink$.addListener({
      next: (command) => {
        if (dict[command.selector]) {
          dict[command.selector].shamefullySendNext(command)
        } else {
          const command$ = xs.create()
          dict[command.selector] = command$
          drawOnCanvas(command.selector, command$)
        }
      },
      error: e => { throw e },
      complete: () => null,
    })

    return xs.empty()
  }

  driver.streamAdapter = XStreamAdapter //eslint-disable-line
  return driver
}
