import path from 'path'
import xs from 'xstream'
import {main as app} from 'app/main'
import {run} from '@cycle/xstream-run'
import {makeFsDriver} from 'drivers/fsDriver'
import {makeCycleAppRunnerDriver} from 'drivers/cycleAppRunnerDriver'
import {markup} from 'markup'

const SOURCE_DIR = path.resolve('../../pages')
const SINK_DIR = path.resolve('../../dist')
const PAGES_PATH = `${SOURCE_DIR}/**/*.json`

const drivers = {
  FS: makeFsDriver({watch: true}),
  AppRunner: makeCycleAppRunnerDriver(app),
}

run(main, drivers)

function main ({FS, AppRunner}) {

  const pageData$ = FS.readJson$
    .map(({path, content}) => ({
      url: path
        .replace(SOURCE_DIR, '')
        .replace(`.json`, ''),
      ...content,
    }))

  const writeHtml$ = markup({AppRunner}, pageData$)
    .map(({url, markup}) => ({
      action: 'write',
      content: markup,
      path: path.join(SINK_DIR, `${url}.html`),
    }))

  const writeJson$ = pageData$
    .map((x) => ({
      action: 'write',
      content: JSON.stringify(x),
      path: path.join(SINK_DIR, `${x.url}.json`),
    }))

  const appParams$ = pageData$.map(x => ({
    id: x.url,
    options: {
      url: x.url,
      state: {[x.url]: x},
    },
  }))

  const readDir$ = xs.of({
    action: 'readDir',
    path: PAGES_PATH,
  })

  const readJson$ = FS.getDir(PAGES_PATH)
    .map(xs.fromArray).flatten()
    .map(path => ({
      action: 'readJson',
      path,
    }))

  return {
    FS: xs.merge(writeHtml$, writeJson$, readJson$, readDir$),
    AppRunner: appParams$,
  }
}
