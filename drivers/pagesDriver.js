import xs from 'xstream'
import minimatch from 'minimatch'
import {filter, propEq} from 'ramda'

export function makePagesDriver ({initialState, urls}) {
  return () => {
    const cache = initialState

    return {
      get,
    }

    function get (url) {
      if (url == '/') url = '/index'

      var page = cache.filter(propEq('url', url))
      if (page.length) {
        return xs.of(page)
      } else {
        return xs.fromPromise(
          fetch(`${url}.json`)
          .then(res => res.json())
        ).map(pageData => [pageData])
      }
    }
  }
}
