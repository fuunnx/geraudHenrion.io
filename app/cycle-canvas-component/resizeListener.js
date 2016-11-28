export const addResizeListener = function (element, onResize) {
  const resizeHandler = () => element.dispatchEvent(new CustomEvent('resize', {bubbles: true}))
  const obj = document.createElement('object')
  obj.type = 'text/html'
  obj.setAttribute('style', `\
display: block;\
position: absolute;\
top: 0;\
left: 0;\
width: 100%;\
height: 100%;\
overflow: hidden;\
pointer-events: none;\
z-index: -1;\
  `)
  element.appendChild(obj)

  setImmediate(() => {
    const computedStyle = getComputedStyle(element)
    if (computedStyle.position === 'static') {
      element.style.position = 'relative'
    }
    if (computedStyle.display === 'inline') {
      element.style.display = 'block'
    }
    obj.contentDocument.defaultView.addEventListener('resize', resizeHandler)
    element.addEventListener('resize', onResize)
    resizeHandler()
  })
  return function dispose () {
    obj.contentDocument.defaultView.removeEventListener('resize', resizeHandler)
    element.removeEventListener('resize', onResize)
    element.removeChild(obj)
  }
}
