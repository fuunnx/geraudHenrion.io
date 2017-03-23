import xs from 'xstream'
import {pluck} from 'utils/operators'
import {listener} from 'utils/listener'
import sitemap from 'sitemap'


export function makeModulesDriver () {
  return function driver (path$) {
    const module$ = path$
      .map(loadModule)
      .flatten()
      .fold((acc, x) => ({...acc, ...x}), {}) // {name: module}
      .remember()

    module$.addListener(listener(() => {}))
    return {
      get: (path) => {
        return module$.compose(pluck(path))
      },
    }
  }
}

function loadModule (path) {
  const page = sitemap[path] || sitemap[path.replace(/\/index$/, '')]
  return xs.fromPromise(
      page.loadModule()
        .then(x => x.default)
        .catch(err => console.error(// eslint-disable-line
  `
  Error while importing module ${path}:


  ${err.stack}
  `
    ))
    )
    .map(m => ({[path]: m}))
}
