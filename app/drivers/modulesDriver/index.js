import {pluck} from 'utils/operators'
import sitemap from 'sitemap'
import xs from 'xstream'

export function makeModulesDriver () {
  return function driver (path$) {
    const module$ = path$
      .map(loadModule)
      .flatten()
      .fold((acc, x) => ({...acc, ...x}), {})
      .remember()

    // required for an unknown reason
    module$.addListener({
      next: () => {},
      error: (err) => { throw err },
      complete: () => {},
    })

    return {
      get: (path) => module$.compose(pluck(path)),
    }
  }
}

function loadModule (path) {
  const page = sitemap[path] || sitemap[path.replace(/\/index$/, '')]
  return xs
    .fromPromise(page
      .loadModule()
      .then(x => x.default)
      .catch(logModuleError(path))
    )
    .map(m => ({[path]: m}))
}

function logModuleError (path) {
  return (err) =>
    console.error(
`
Error while importing module ${path}:
${err.stack}
`
    )
}
