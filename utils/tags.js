import {h} from '@cycle/dom'

export function headTag (content) {
  return h('head', content)
}
export function script (...args) {
  return h('script', ...args)
}
export function meta (attrs) {
  return h('meta', {attrs})
}
export function stylesheet (href) {
  return h('link', {attrs: {rel: `stylesheet`, href}})
}
export function title (str) {
  return h('title', [str])
}
