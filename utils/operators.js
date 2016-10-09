import xs from 'xstream'

export function flattenParallel (stream) {
  return stream
    .fold((acc$, x$) => xs.merge(acc$, x$), xs.empty())
    .flatten()
}
