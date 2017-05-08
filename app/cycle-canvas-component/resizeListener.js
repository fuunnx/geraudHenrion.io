import insertionQ from 'insertion-query'

export const addResizeListener = function (element, onResize) {
  const resizeEvent = new CustomEvent('resize', {bubbles: true})
  const resizeHandler = () => element.dispatchEvent(resizeEvent)
  const objID = `fnx-resizelistener-${Date.now()}-${randomInt(1000)}`

  const iframe = document.createElement('iframe')
  iframe.setAttribute('type', 'text/html')
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

  insertionQ.config({strictlyNew: false, timeout: 0})
  insertionQ('#' + objID).every(onInsertion)

  function onInsertion () {
    const {position, display} = getComputedStyle(element)
    if (position === 'static') { element.style.position = 'relative' }
    if (display === 'inline') { element.style.display = 'block' }

    const contentDocument = iframe.contentDocument
      ? iframe.contentDocument
      : iframe.contentWindow.document

    contentDocument.defaultView.addEventListener('resize', resizeHandler)
    element.addEventListener('resize', onResize)
    resizeHandler()
  }

  setImmediate(() => element.appendChild(iframe))

  return function dispose () {
    const contentDocument = iframe.contentDocument
      ? iframe.contentDocument
      : iframe.contentWindow.document

    contentDocument.defaultView.removeEventListener('resize', resizeHandler)
    element.removeEventListener('resize', onResize)
    element.removeChild(iframe)
  }
}

function randomInt (max) {
  return Math.round(Math.random() * max)
}
