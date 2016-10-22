import {run} from '@cycle/xstream-run'
import {createHistory} from 'history'
import {makeDOMDriver} from '@cycle/dom'
import {makeHistoryDriver} from '@cycle/history'
import {makeHeadDriver} from 'drivers/headDriver'
import {makeCacheDriver} from 'drivers/cacheDriver'
import {main} from './main'

const history = createHistory()

const drivers = {
  Body: makeDOMDriver(`#app`),
  Head: makeHeadDriver(),
  Cache: makeCacheDriver({}),
  History: makeHistoryDriver(history, {capture: true}),
}

run(main, drivers)
