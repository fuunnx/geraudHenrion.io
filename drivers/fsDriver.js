import glob from 'glob-promise'
import xs from 'xstream'
import fs from 'fs-promise'

import {writeFile} from 'utils/writeFile'
import {listener} from 'utils/listener'

export function makeFsDriver () {
  return (write$) => {
    write$.addListener(listener(
        ({path, content}) => writeFile(path, content)
      ))

    return {
      readDir: (globPath) => xs.fromPromise(glob(globPath)),
      readFile: (filePath) => xs.fromPromise(fs.readFile(filePath)),
      readJson: (filePath) => xs.fromPromise(fs.readJson(filePath)),
    }
  }
}
