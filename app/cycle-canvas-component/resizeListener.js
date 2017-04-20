import insertionQ from 'insertion-query'

export const addResizeListener = function (element, onResize) {
  const resizeHandler = () => element.dispatchEvent(new CustomEvent('resize', {bubbles: true}))
  const iframe = document.createElement('iframe')
  const objID = String('fnx-resizelistener-' + Date.now() + Math.round(Math.random() * 1000))

  iframe.type = 'text/html'
  iframe.setAttribute('id', objID)
  iframe.setAttribute('style', `\
display: block;\
position: absolute;\
top: 0;\
left: 0;\
width: 100%;\
height: 100%;\
overflow: hidden;\
pointer-events: none;\
z-index: -1;\
opacity: 0;\
  `)

  insertionQ('#' + objID)
    .every(onReady)

  function onReady () {
    const computedStyle = getComputedStyle(element)
    if (computedStyle.position === 'static') {
      element.style.position = 'relative'
    }
    if (computedStyle.display === 'inline') {
      element.style.display = 'block'
    }
    const contentDocument = iframe.contentDocument
      ? iframe.contentDocument
      : iframe.contentWindow.document

    contentDocument.defaultView.addEventListener('resize', resizeHandler)
    element.addEventListener('resize', onResize)
    resizeHandler()
  }

  element.appendChild(iframe)

  return function dispose () {
    const contentDocument = iframe.contentDocument
      ? iframe.contentDocument
      : iframe.contentWindow.document

    contentDocument.defaultView.removeEventListener('resize', resizeHandler)
    element.removeEventListener('resize', onResize)
    element.removeChild(iframe)
  }
}
