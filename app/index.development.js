import {makeDOMHeadDriver} from 'drivers/headDriver'
import {makeAnimationDriver} from 'drivers/cycle-animation-driver'
import {makeDOMDriver} from '@cycle/dom'
import {makeHistoryDriver} from '@cycle/history'
import {recycler, recyclable} from 'utils/recycle'
import Cycle from '@cycle/xstream-run'
import {createHistory} from 'history'
import {makeModulesDriver} from 'drivers/modulesDriver'

import {root} from './root'
import {HEAD_NAMESPACE, APP_NODE} from './settings.js'


const History = makeHistoryDriver(createHistory(), {capture: true}) // should not be reinstantiated or loose the capture of clicks
const driversFactory = () => ({
  DOM: recyclable(makeDOMDriver(APP_NODE, {transposition: true}),
    {pauseSinksWhileReplaying: false}),
  History: recyclable(History),
  Head: recyclable(makeDOMHeadDriver(HEAD_NAMESPACE)),
  Modules: require('drivers/modulesDriver').makeModulesDriver(),
  Animation: makeAnimationDriver(),
})

const rerun = recycler(Cycle, root, driversFactory())

if (module.hot) {
  module.hot.accept([
    './root',
    'drivers/modulesDriver',
  ], () => {
    //console.clear() // eslint-disable-line
    rerun(root, driversFactory())
  })
}
