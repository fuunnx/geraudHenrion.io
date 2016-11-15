export function listener (subscribeFn) {
  return {
    next: subscribeFn,
    error: (err) => console.error(err), // eslint-disable-line
    complete: () => {}, // eslint-disable-line
  }
}
