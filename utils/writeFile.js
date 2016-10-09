import mkdirp_cb from 'mkdirp'
import path from 'path'
import fs from 'fs-promise'

export function writeFile (fileName, content) {
  const dirName = path.dirname(fileName)
  return mkdirp(dirName)
    .then(() => fs.writeFile(fileName, content))
    .catch(err => console.error(err)) // eslint-disable-line
}

const mkdirp = (...args) => new Promise((resolve, reject) =>
  mkdirp_cb(...args, (err) => err ? reject(err) : resolve(true)))
