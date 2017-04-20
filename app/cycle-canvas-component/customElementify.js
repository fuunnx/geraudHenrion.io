import canvasPixelRatio from 'app/cycle-canvas-component/pixelRatio'
import {addResizeListener} from './resizeListener'
import {makeCanvasDriver} from './cycle-canvas'
import Cycle from '@cycle/xstream-run'
import xs from 'xstream'
const CYCLE_CANVAS_STRUCTURE_CHANGE = 'cycleCanvasStructureChange'


export default function (component) {
  const observedAttributes = ['width', 'height', 'data-fnx-structure']
  let disposeCycleApp = () => ({}) //eslint-disable-line
  let disposeResizeListener = () => ({}) //eslint-disable-line

  return class CanvasComponent extends HTMLDivElement {
    static observedAttributes = observedAttributes
    createdCallback() {
      this.style.overflow = 'hidden' //eslint-disable-line
      //https://github.com/WebReflection/document-register-element#common-issues--caveat
      this.props$ = xs.create()
      this.view$ = xs.create()

      this.addEventListener(
        CYCLE_CANVAS_STRUCTURE_CHANGE,
        (x) => this.view$.shamefullySendNext(x.detail)
      )

      const el = this.appendChild(document.createElement('canvas')) //eslint-disable-line
      this.el = el //eslint-disable-line
      el.setAttribute('style', `
display: block;\
position: absolute;\
top: 0;\
left: 0;\
width: 100%;\
height: 100%;\
overflow: hidden;\
`)
      const width = (this.attributes.width || 340)
      const height = (this.attributes.height || 480)
      el.width = width
      el.height = height
      const {run} = Cycle(component, {
        Canvas: makeCanvasDriver(el, {
          width,
          height,
        }),
        Props: () => this.props$,
        View: () => this.view$,
      })
      disposeCycleApp = run()
      this.props$.shamefullySendNext(makePropsObject(this))

      disposeResizeListener = addResizeListener(this, (evt) => {
        makeResizeCb(this)(evt)
        this.props$.shamefullySendNext(makePropsObject(this))
      })
    }
    disconnectedCallback () {
      disposeCycleApp()
      disposeResizeListener()
    }
    attributeChangedCallback (attrName, _, value) {
      this.props$.shamefullySendNext(makePropsObject(this))
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
  const context = canvasElement.getContext('2d')
  const pixelRatio = parseFloat(element.dataset['pixelRatio'] || canvasPixelRatio)
  context.scale(pixelRatio, pixelRatio)

  return (evt) => {
    canvasElement.width = element.clientWidth * pixelRatio
    canvasElement.height = element.clientHeight * pixelRatio
  }
}
