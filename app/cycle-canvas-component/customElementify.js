import {makeCanvasDriver} from './cycle-canvas'
import Cycle from '@cycle/xstream-run'
import xs from 'xstream'
import {addResizeListener} from './resizeListener'
import {makeAnimationDriver} from 'drivers/cycle-animation-driver'


export default function (component) {
  const props$ = xs.create()
  const observedAttributes = ['width', 'height', 'data-fnx-structure']
  let disposeCycleApp = () => ({}) //eslint-disable-line
  let disposeResizeListener = () => ({}) //eslint-disable-line
  let resizeCb = () => ({}) //eslint-disable-line

  return class CanvasComponent extends HTMLDivElement {
    static observedAttributes = observedAttributes
    createdCallback() {
      this.style.overflow = 'hidden'
      //https://github.com/WebReflection/document-register-element#common-issues--caveat
      const el = this.appendChild(document.createElement('canvas')) //eslint-disable-line
      this.el = el //eslint-disable-line
      el.setAttribute('style', `\
    display: block;\
    position: absolute;\
    top: 0;\
    left: 0;\
    bottom: 0;\
    right: 0;\
    overflow: hidden;\
      `)
      const {run} = Cycle(component, {
        Canvas: makeCanvasDriver(el, {width: 0, height: 0}),
        Props: () => props$,
        Animation: makeAnimationDriver(),
      })
      disposeCycleApp = run()
      props$.shamefullySendNext(makePropsObject(this))

      disposeResizeListener = addResizeListener(this, (evt) => {
        makeResizeCb(this)(evt)
        props$.shamefullySendNext(makePropsObject(this))
      })
    }
    connectedCallback () {
    }
    disconnectedCallback () {
      disposeCycleApp()
      disposeResizeListener()
    }
    attributeChangedCallback (attrName, _, value) {
      props$.shamefullySendNext(makePropsObject(this))
    }
  }
}


function makePropsObject(element) {
  const result = {
    ...element.attributes,
    width: element.el.width,
    height: element.el.height,
  }
  const attributes = element.attributes
  for (let i = 0, N = attributes.length; i < N; i++) { //eslint-disable-line
    const attribute = attributes[i]
    result[attribute.name] = attribute.value //eslint-disable-line
  }
  return result
}

function makeResizeCb (element) {
  const canvasElement = element.el
  return (evt) => {
    canvasElement.width = element.clientWidth
    canvasElement.height = element.clientHeight
  }
}
