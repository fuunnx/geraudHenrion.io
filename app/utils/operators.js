import dropRepeats from 'xstream/extra/dropRepeats'

export function pluck (propName) {
  return (x$) => x$
    .map(x => x[propName])
    .filter(x => typeof x !== 'undefined')
    .compose(dropRepeats())
}
