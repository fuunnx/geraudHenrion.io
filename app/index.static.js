import {makeHTMLHeadDriver} from 'drivers/headDriver'
import {makeHTMLDriver} from '@cycle/dom'
import {makeModulesDriver} from 'drivers/modulesDriver'
import {makeHistoryDriver} from '@cycle/history'
import {createMemoryHistory} from 'history'
import {run} from '@cycle/xstream-run'
import {pluck} from 'utils/operators'
import xs from 'xstream'

import {root} from './root'
import {HEAD_NAMESPACE, APP_NODE} from './settings.js'

const toHTML = ([head, body]) => `\
<!DOCTYPE html>\
<html lang="fr">\
${head}\
<link rel="stylesheet" href="/styles.css">\
<div id="${APP_NODE.replace('#', '')}">${body}</div>\
<script src="/vendor.bundle.js"></script>\
<script src="/js.bundle.js"></script>\
`

// for static site renderer
export default function app ({path}, callback) {
  const producer = {
    start: (listener) => {
      const drivers = {
        DOM: makeHTMLDriver(x => listener.next({DOM: x}), {transposition: true}),
        Head: makeHTMLHeadDriver(HEAD_NAMESPACE, x => listener.next({Head: x})),
        History: makeHistoryDriver(createMemoryHistory(path)),
        Modules: makeModulesDriver(),
        Animation: () => xs.of({}),
        Context: () => 'server',
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
    .map(toHTML)
    .addListener({
      error: error => callback(error, null),
      next: markup => callback(null, markup),
      complete: () => {},
    })
}
