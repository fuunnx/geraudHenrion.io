import {run} from '@cycle/xstream-run'
import xs from 'xstream'

import {makeHTMLDriver} from '@cycle/dom'
import {makeHistoryDriver, createServerHistory} from '@cycle/history'
import {makePagesDriver} from 'drivers/pagesDriver'
import {main} from './main'


export function runApp ({initialState, urls}) {
  const producer = {
    start: function (listener) {
      const drivers = {
        DOM: makeHTMLDriver((markup) => listener.next(markup)),
        History: makeHistoryDriver(createServerHistory(initialState.url)),
        Pages: makePagesDriver({initialState: [initialState], urls}),
      }
      run(main, drivers)
    },
    stop: () => {},
  }

  return xs.create(producer).debug()
}
