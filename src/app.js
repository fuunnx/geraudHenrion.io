import {run} from '@cycle/xstream-run'
import {createHistory} from 'history'
import {makeDOMDriver} from '@cycle/dom'
import {makeHistoryDriver} from '@cycle/history'
import {makePagesDriver} from 'drivers/pagesDriver'
import {main} from './main'

const history = createHistory()

const drivers = {
  DOM: makeDOMDriver(`#app`),
  History: makeHistoryDriver(history, {capture: true}),
  Pages: makePagesDriver(window.pageDriverConfig),
}

run(main, drivers)
