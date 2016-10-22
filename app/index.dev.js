import {createHistory} from 'history'
import {run} from '@cycle/xstream-run'
import {makeDOMDriver} from '@cycle/dom'
import {makeHistoryDriver} from '@cycle/history'
import {rerunner, restartable} from 'cycle-restart'
import {makeHeadDriver} from 'drivers/headDriver'
import {makeCacheDriver} from 'drivers/cacheDriver'
import {main} from './main'

console.log('yooo')
const history = createHistory()

const drivers = {
  DOM: restartable(makeDOMDriver(`#app`), {pauseSinksWhileReplaying: false}),
  Head: restartable(makeHeadDriver()),
  Cache: makeCacheDriver({}),
  History: makeHistoryDriver(history, {capture: true}),
}

const rerun = rerunner(run)
rerun(main, drivers)

if (module.hot) {
  module.hot.accept('./main', () => {
    rerun(require('./main').main, drivers)
  })
}
