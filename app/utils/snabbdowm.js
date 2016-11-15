import md from 'markdown-string'
import virtualize from 'snabbdom-virtualize/strings'


export default function snabbdowm (...args) {
  if (process.env.RUN_CONTEXT === 'browser') {
    return virtualize(md(...args))
  }
  if (process.env.RUN_CONTEXT === 'node') {
    var jsdom = require('jsdom').jsdom
    return virtualize(md(...args), {context: jsdom('<html></html>')})
  }
}
