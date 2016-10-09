import xs from 'xstream'
import path from 'path'
import {run} from '@cycle/xstream-run'
import {replace, map} from 'ramda'

import {flattenParallel} from 'utils/operators'
import {runApp} from 'app/index.pagesBuilder'
import {makeFsDriver} from 'drivers/fsDriver'

const SOURCE_DIR = './pages'
const SINK_DIR = './dist'
const drivers = {
  FS: makeFsDriver({watch: true}),
}

run(main, drivers)

function main ({FS}) {
  const directory$ = FS.readDir(`${SOURCE_DIR}/**/*.json`)
  const urls$ = directory$.map(map(replace(SOURCE_DIR, '')))

  const pageData$ = directory$
    .map(xs.fromArray).flatten()
    .map(filePath => xs
      .from(FS.readJson(filePath))
      .map(state => ({
        ...state,
        url: filePath
          .replace(SOURCE_DIR, '')
          .replace(`.json`, ''),
      }))
    )
    .compose(flattenParallel)

  const markup$ = xs.combine(pageData$, urls$)
    .map(([initialState, urls]) =>
      runApp({initialState, urls})
      .map(markup => `<!DOCTYPE html>
<html lang="fr">
<meta charset="utf-8">
<title>Géraud Henrion | Creative developper</title>
<link rel="stylesheet" href="/styles.css">
<div id="app">${markup}</div>
<script>
window.pageDriverConfig = {
  initialState: [${JSON.stringify(initialState)}],
  urls: ${JSON.stringify(urls)},
}
</script>
<script src="/app.js"></script>
`)
      .map((markup) => ({
        markup,
        url: initialState.url,
      }))
    )
    .compose(flattenParallel)

  const writeHtml$ = markup$
    .map(({url, markup}) => ({
      content: markup,
      path: path.join(SINK_DIR, `${url}.html`),
    }))
  const writeJson$ = pageData$
    .map((x) => ({
      content: JSON.stringify(x),
      path: path.join(SINK_DIR, `${x.url}.json`),
    }))

  return {
    FS: xs.merge(writeHtml$, writeJson$),
  }
}
