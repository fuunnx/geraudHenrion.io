import glob from 'glob-promise'
import globWatch from 'glob-watcher'
import xs from 'xstream'
import fs from 'fs-promise'
import {symmetricDifference} from 'ramda'

import {writeFile} from 'utils/writeFile'
import {listener} from 'utils/listener'

export function makeFsDriver ({watch = false} = {}) {
  return (write$) => {
    write$.addListener(listener(
        ({path, content}) => writeFile(path, content)
      ))

    if (watch) {
      return {
        readDir: (globPath) =>
          makeFsWatcher(glob)(globPath)
            .fold((prev, next) => symmetricDifference(prev, next), []),
        readJson: makeFsWatcher(fs.readJson),
        readFile: makeFsWatcher(fs.readFile),
      }
    } else {
      return {
        readDir: (globPath) => xs.fromPromise(glob(globPath)),
        readFile: (filePath) => xs.fromPromise(fs.readFile(filePath)),
        readJson: (filePath) => xs.fromPromise(fs.readJson(filePath)),
      }
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
}
