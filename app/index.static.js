import {makeModulesDriver} from 'drivers/modulesDriver'
import {HEAD_NAMESPACE, APP_NODE} from './settings.js'
import {makeHTMLHeadDriver} from 'drivers/headDriver'
import {makeHistoryDriver} from '@cycle/history'
import {createMemoryHistory} from 'history'
import {mockTimeSource} from '@cycle/time'
import {makeHTMLDriver} from '@cycle/dom'
import {run} from '@cycle/xstream-run'
import {pluck} from 'utils/operators'
import {root} from './root'
import xs from 'xstream'

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
        Time: () => mockTimeSource({interval: 10}),
        Modules: makeModulesDriver(),
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
