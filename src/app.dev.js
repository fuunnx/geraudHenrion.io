import {run} from '@cycle/xstream-run'
import {createHistory} from 'history'
import {makeDOMDriver} from '@cycle/dom'
import {makeHistoryDriver} from '@cycle/history'
import {makePagesDriver} from 'drivers/pagesDriver'
import {main} from './main'

import {rerunner, restartable} from 'cycle-restart'


const history = createHistory()

const drivers = {
  DOM: restartable(makeDOMDriver(`#app`), {pauseSinksWhileReplaying: false}),
  History: makeHistoryDriver(history, {capture: true}),
  Pages: makePagesDriver(window.pageDriverConfig),
}

const rerun = rerunner(run)
rerun(main, drivers)

if (module.hot) {
  module.hot.accept('./main', () => {
    rerun(require('./main').main, drivers)
  })
}
