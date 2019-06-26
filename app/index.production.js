import {makeModulesDriver} from 'drivers/modulesDriver'
import {HEAD_NAMESPACE, APP_NODE} from './settings.js'
import {makeCanvasDriver} from 'drivers/canvasDriver'
import {makeWindowDriver} from 'drivers/windowDriver'
import {makeDOMHeadDriver} from 'drivers/headDriver'
import {makeHistoryDriver} from '@cycle/history'
import {makeDOMDriver} from '@cycle/dom'
import {timeDriver} from '@cycle/time'
import {run} from '@cycle/xstream-run'
import {createHistory} from 'history'
import {root} from './root'

document.addEventListener('DOMContentLoaded', init)

function init () {
  const drivers = {
    History: makeHistoryDriver(createHistory(), {capture: true}),
    DOM: makeDOMDriver(APP_NODE, {transposition: true}),
    Head: makeDOMHeadDriver(HEAD_NAMESPACE),
    Modules: makeModulesDriver(),
    Canvas: makeCanvasDriver(),
    Window: makeWindowDriver(),
    Context: () => 'browser',
    Time: timeDriver,
  }

  run(root, drivers)
}
