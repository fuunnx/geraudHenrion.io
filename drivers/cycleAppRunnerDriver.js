import xs from 'xstream'
import {propEq} from 'ramda'
import {pluck} from 'utils/operators'
import {run} from '@cycle/xstream-run'
import {makeHTMLDriver} from '@cycle/dom'
import {makeCacheDriver} from 'drivers/cacheDriver'
import flattenConcurrently from 'xstream/extra/flattenConcurrently'
import {makeHistoryDriver, createServerHistory} from '@cycle/history'


export function makeCycleAppRunnerDriver (cycleApp) {
  return (options$) => {
    const effect$ = options$.map(({id, options}) => {
      return runAppSimulation(cycleApp, options)
        .map(x => ({id, payload: x}))
    })
      .compose(flattenConcurrently)

    return {
      select: (id) => effect$
        .filter(propEq('id', id))
        .compose(pluck('payload')),
    }
  }
}

function runAppSimulation (cycleApp, {url}) {
  const producer = {
    start: (listener) => {
      const drivers = {
        DOM: makeHTMLDriver(x => listener.next({Body: x})),
        Head: makeHTMLDriver(x => listener.next({Head: x})),
        History: makeHistoryDriver(createServerHistory(url)),
        Cache: makeCacheDriver({}),
      }
      setImmediate(() => run(cycleApp, drivers)) // let subscriptions being done before running. Usefull ???
    },
    stop: () => {},
  }
  return xs.create(producer)
    .fold((prev, neww) => ({...prev, ...neww}), {})
}
