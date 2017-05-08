let ratio = 1

if (process.env.RUN_CONTEXT === 'browser') {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  // http://www.html5rocks.com/en/tutorials/canvas/hidpi/?redirect_from_locale=fr
  const devicePixelRatio = window.devicePixelRatio || 1
  const backingStoreRatio = context.webkitBackingStorePixelRatio
    || context.mozBackingStorePixelRatio
    || context.msBackingStorePixelRatio
    || context.oBackingStorePixelRatio
    || context.backingStorePixelRatio || 1

  ratio = devicePixelRatio / backingStoreRatio
}

export default ratio
