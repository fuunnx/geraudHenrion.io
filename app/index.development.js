import {HEAD_NAMESPACE, APP_NODE} from './settings.js'
import {makeCanvasDriver} from 'drivers/cycle-canvas'
import {makeDOMHeadDriver} from 'drivers/headDriver'
import {recycler, recyclable} from 'utils/recycle'
import {makeHistoryDriver} from '@cycle/history'
import {makeDOMDriver} from '@cycle/dom'
import {timeDriver} from '@cycle/time'
import Cycle from '@cycle/xstream-run'
import {createHistory} from 'history'
import {root} from './root'

// should not be reinstantiated or loose the capture of clicks
const History = makeHistoryDriver(createHistory(), {capture: true})

const driversFactory = () => ({
  DOM: recyclable(
    makeDOMDriver(APP_NODE, {transposition: true}),
    {pauseSinksWhileReplaying: false},
  ),
  Modules: require('drivers/modulesDriver').makeModulesDriver(),
  Head: recyclable(makeDOMHeadDriver(HEAD_NAMESPACE)),
  History: recyclable(History),
  Canvas: makeCanvasDriver(),
  Context: () => 'browser',
  Time: timeDriver,
})

const rerun = recycler(Cycle, root, driversFactory())

if (module.hot) {
  module.hot.accept(
    [
      './root',
      'drivers/modulesDriver',
    ],
    () => {
      console.clear() // eslint-disable-line
      rerun(root, driversFactory())
    }
  )
}
