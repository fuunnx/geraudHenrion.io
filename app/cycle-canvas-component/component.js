import canvasPixelRatio from './pixelRatio'
import {addResizeListener} from './resizeListener'

export default class CanvasComponent extends HTMLDivElement {
  static observedAttributes = ['width', 'height', 'pixelRatio']
  createdCallback () {
    this.canvas = this.appendChild(document.createElement('canvas')) //eslint-disable-line
    this.canvas.setAttribute('style', `
display: block;\
position: absolute;\
top: 0;\
left: 0;\
width: 100%;\
height: 100%;\
overflow: hidden;\
    `)
    this.resizeCb()
    this.style.overflow = 'hidden'
    //https://github.com/WebReflection/document-register-element#common-issues--caveat

    this.disposeResizeListener = addResizeListener(
      this,
      this.resizeCb.bind(this),
    )
  }
  disconnectedCallback () {
    this.disposeResizeListener()
  }
  attributeChangedCallback () {
    this.resizeCb()
  }
  disposeResizeListener () {}
  resizeCb () {
    const pixelRatio =
      parseFloat(this.dataset['pixelRatio'])
      || canvasPixelRatio

    this.canvas.getContext('2d').scale(pixelRatio, pixelRatio)
    this.canvas.width = (this.clientWidth * pixelRatio || this.width)
    this.canvas.height = (this.clientHeight * pixelRatio || this.height)
  }
}
