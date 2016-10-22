import glob from 'glob-promise'
import globWatch from 'glob-watcher'
import xs from 'xstream'
import fsp from 'fs-promise'
import {symmetricDifference, propEq} from 'ramda'
import flattenConcurrently from 'xstream/extra/flattenConcurrently'
import {writeFile} from 'utils/writeFile'
import {listener} from 'utils/listener'
import {pluck} from 'utils/operators'

export function makeFsDriver () {
  return (action$) => {
    const write$ = action$.filter(propEq('action', 'write'))
    const readJson$ = action$.filter(propEq('action', 'readJson'))
      .compose(pluck('path'))
      .map(makeFsWatcher(fsp.readJSON))
      .compose(flattenConcurrently)
    const readDir$ = action$.filter(propEq('action', 'readDir'))
      .compose(pluck('path'))
      .map(x => makeFsWatcher(glob)(x)
        .fold((prev, next) => ({
          path: next.path,
          content: symmetricDifference(prev.content || [], next.content),
        }), [])
      )
      .compose(flattenConcurrently)

    write$.addListener(listener(
        ({path, content}) => writeFile(path, content)
          .then(() => console.log('Successfully write file to ' + path)) //eslint-disable-line
          .catch((err) => console.error('Error while writing file ' + path, err)) //eslint-disable-line
      ))

    return {
      getDir: (path) => {
        return readDir$
          .filter(propEq('path', path))
          .compose(pluck('content'))
      },
      readDir$,
      readJson$,
    }
  }
}

function makeFsWatcher (fn) {
  return (glob) => xs.create({
    start: (listener) => {
      fn(glob).then(x => listener.next(x))
      globWatch(glob).on('change', () =>
        fn(glob).then(x => listener.next(x))
      )
    },
    stop: () => {},
  })
  .map(content => ({path: glob, content}))
}
