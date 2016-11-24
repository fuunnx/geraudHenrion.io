import {makeCanvasDriver} from './cycle-canvas'
import Cycle from '@cycle/xstream-run'
import xs from 'xstream'



export default function (component) {
  const props$ = xs.create()
  const observedAttributes = ['width', 'height', 'data-structure']
  let props = {}
  let dispose = () => ({})

  return class CanvasComponent extends HTMLElement {
    static observedAttributes = observedAttributes
    createdCallback() {
      //https://github.com/WebReflection/document-register-element#common-issues--caveat
      const el = this.appendChild(document.createElement('canvas'))
      this.el = el
      const {run} = Cycle(component, {
        Canvas: makeCanvasDriver(el, {width: 1000, height: 1000}),
        props: () => props$,
      })
      dispose = run()
      props = makePropsObject(this)
      props$.shamefullySendNext(props)
    }
    connectedCallback () {}
    disconnectedCallback () {
      dispose() //eslint-disable-line
    }
    attributeChangedCallback (attrName, _, value) {
      if (!props) return
      props[attrName] = value //eslint-disable-line
      props$.shamefullySendNext(props)
    }
  }
}


function makePropsObject(element) {
  const result = {}
  const attributes = element.attributes
  for (let i = 0, N = attributes.length; i < N; i++) { //eslint-disable-line
    const attribute = attributes[i]
    result[attribute.name] = attribute.value //eslint-disable-line
  }
  return result
}
