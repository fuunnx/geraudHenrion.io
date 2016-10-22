import xs from 'xstream'
import {pluck} from 'utils/operators'

export function makeCacheDriver (initialState = {}) {
  return function (req$) {
    const cache$ = xs.combine(
      xs.of(initialState),
      req$.debug().map(request).flatten(),
    )
    .map(([x, y]) => ({...x, ...y}))
    return {
      select: (url) => {
        if (url == '/') {url = '/index'}
        return cache$.compose(pluck(url))
      },
    }
  }
}

function request (url) {
  if (url == '/') {url = '/index'}
  return xs.of({[url]: {content: 'response from' + url}})
}
