import {makeDOMHeadDriver, makeHTMLHeadDriver} from 'drivers/headDriver'
import {makeDOMDriver, makeHTMLDriver} from '@cycle/dom'
import {makeModulesDriver} from 'drivers/modulesDriver'
import {makeHistoryDriver} from '@cycle/history'
import {recycler, recyclable} from 'utils/recycle'
import {createMemoryHistory} from 'history'
import {run} from '@cycle/xstream-run'
import Cycle from '@cycle/xstream-run'
import {createHistory} from 'history'
import {pluck} from 'utils/operators'
import xs from 'xstream'

import {root} from './root'

const HEAD_NAMESPACE = '.fnx-head'
const APP_NODE = '#app'


if (process.env.RUN_CONTEXT === 'browser'
  && process.env.NODE_ENV === 'production') {

  const drivers = {
    Body: makeDOMDriver(APP_NODE),
    Head: makeDOMHeadDriver(HEAD_NAMESPACE),
    History: makeHistoryDriver(createHistory(), {capture: true}),
    Modules: makeModulesDriver(),
  }

  run(root, drivers)
}


if (process.env.RUN_CONTEXT === 'browser'
  && process.env.NODE_ENV === 'development') {
  const History = makeHistoryDriver(createHistory(), {capture: true}) // should not be reinstantiated or loose the capture of clicks
  const driversFactory = () => ({
    DOM: recyclable(makeDOMDriver(APP_NODE),
      {pauseSinksWhileReplaying: false}),
    History: recyclable(History),
    Head: recyclable(makeDOMHeadDriver(HEAD_NAMESPACE)),
    Modules: require('drivers/modulesDriver').makeModulesDriver(),
  })

  const rerun = recycler(Cycle, root, driversFactory())

  if (module.hot) {
    module.hot.accept(['./root', 'drivers/modulesDriver'], () => {
      console.clear() // eslint-disable-line
      rerun(require('./root').root, driversFactory())
    })
  }
}

// for static site renderer
export default function ({path}, callback) {
  const producer = {
    start: (listener) => {
      const drivers = {
        DOM: makeHTMLDriver(x => listener.next({DOM: x})),
        Head: makeHTMLHeadDriver(HEAD_NAMESPACE, x => listener.next({Head: x})),
        History: makeHistoryDriver(createMemoryHistory(path)),
        Modules: makeModulesDriver(),
      }
      setImmediate(() => run(root, drivers))
    },
    stop: () => {},
  }

  const sideEffect$ = xs.create(producer)
    .fold((prev, neww) => ({...prev, ...neww}), {})

  const body$ = sideEffect$.compose(pluck('DOM'))
  const head$ = sideEffect$.compose(pluck('Head'))

  xs.combine(head$, body$)
    .map(([head, body]) => `\
<!DOCTYPE html>\
<html lang="fr">\
${head}\
<link rel="stylesheet" href="/styles.css">\
<div id="${APP_NODE.replace('#', '')}">${body}</div>\
<script src="/index.js"></script>\
`)
    .addListener({
      error: error => callback(error, null),
      next: markup => callback(null, markup),
      complete: () => {},
    })
}
