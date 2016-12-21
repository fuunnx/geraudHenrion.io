import insertionQ from 'insertion-query'

export const addResizeListener = function (element, onResize) {
  const resizeHandler = () => element.dispatchEvent(new CustomEvent('resize', {bubbles: true}))
  const obj = document.createElement('object')
  const objID = String(new Date + Math.round(Math.random() * 1000))
  obj.type = 'text/html'
  obj.setAttribute('id', objID)
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
  insertionQ('#' + objID)
  .every(() => {
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
