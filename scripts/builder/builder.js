import path from 'path'
import xs from 'xstream'
import {main as app} from 'app/main'
import {pluck} from 'utils/operators'
import {run} from '@cycle/xstream-run'
import {makeFsDriver} from 'drivers/fsDriver'
import {makeCycleAppRunnerDriver} from 'drivers/cycleAppRunnerDriver'
import flattenConcurrently from 'xstream/extra/flattenConcurrently'


const SOURCE_DIR = path.resolve('./pages')
const SINK_DIR = path.resolve('./dist')
const drivers = {
  FS: makeFsDriver({watch: true}),
  AppRunner: makeCycleAppRunnerDriver(app),
}

run(main, drivers)

function main ({FS, AppRunner}) {
  const pagesPath = `${SOURCE_DIR}/**/*.json`
  const directorys$ = FS.getDir(pagesPath)

  const pageData$ = FS.readJson$
    .map(({path, content}) => ({
      url: path
        .replace(SOURCE_DIR, '')
        .replace(`.json`, ''),
      ...content,
    }))

  const markup$ = pageData$
    .compose(pluck('url'))
    .map(url => {
      const effect$ = AppRunner.select(url)
      const head$ = effect$.compose(pluck('Head'))
      const body$ = effect$.compose(pluck('Body'))
      return xs.combine(head$, body$)
        .map(([head, body]) => `
<!DOCTYPE html>
<html lang="fr">
${head}
<div id="app">${body}</div>
<script src="/app.js"></script>
        `)
        .map(markup => ({url, markup}))
    })
    .compose(flattenConcurrently)

  const readJson$ = directorys$
    .map(xs.fromArray).flatten()
    .map(path => ({
      action: 'readJson',
      path,
    }))

  const readDir$ = xs.of({
    action: 'readDir',
    path: pagesPath,
  })

  const writeHtml$ = markup$
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

  return {
    FS: xs.merge(writeHtml$, writeJson$, readJson$, readDir$),
    AppRunner: appParams$,
  }
}
