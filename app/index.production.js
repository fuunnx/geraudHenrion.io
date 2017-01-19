import {makeDOMHeadDriver} from 'drivers/headDriver'
import {makeAnimationDriver} from 'drivers/cycle-animation-driver'
import {makeDOMDriver} from '@cycle/dom'
import {makeModulesDriver} from 'drivers/modulesDriver'
import {makeHistoryDriver} from '@cycle/history'
import {run} from '@cycle/xstream-run'
import {createHistory} from 'history'

import {root} from './root'
import {HEAD_NAMESPACE, APP_NODE} from './settings.js'

const drivers = {
  DOM: makeDOMDriver(APP_NODE, {transposition: true}),
  Head: makeDOMHeadDriver(HEAD_NAMESPACE),
  History: makeHistoryDriver(createHistory(), {capture: true}),
  Modules: makeModulesDriver(),
  Animation: makeAnimationDriver(),
}

run(root, drivers)
