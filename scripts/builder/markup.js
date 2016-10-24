import {pluck} from 'utils/operators'
import xs from 'xstream'
import flattenConcurrently from 'xstream/extra/flattenConcurrently'


export function markup ({AppRunner}, pageData$) {
  return pageData$
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
}
