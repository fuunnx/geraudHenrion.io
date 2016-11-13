import xs from 'xstream'
import {pluck} from 'utils/operators'
import {listener} from 'utils/listener'


export function makeModulesDriver () {
  return (path$) => {
    const module$ = path$
      .map(loadModule)
      .flatten()

    module$.addListener(listener(() => {}))
    return {
      get: (path) => {
        return module$.compose(pluck(path))
      },
    }
  }
}


function loadModule (path) {
  return xs.fromPromise(
    systemImport(path.replace(/^\//, ''))
      .then(x => x.default)
      .catch(err => console.error(// eslint-disable-line
`
Error while importing module ${path}:


${err.stack}
`
  ))
  ).map(m => ({[path]: m}))
}


function systemImport(name) {
  return new Promise((res, rej) => {
    if(!name) name = 'index'
    try {require.ensure([], require => {
      res(require('pages/' + name + '/index.js'))
    })}
    catch(err) {rej(err)}
  })
}
