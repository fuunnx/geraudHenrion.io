

import {makeCanvasDriver} from './cycle-canvas'
import Cycle from '@cycle/xstream-run'
import xs from 'xstream'

if(process.env.RUN_CONTEXT === 'browser') {
  // require('webcomponents.js/webcomponents.js')
}

// slight modification to https://github.com/staltz/cycle-custom-elementify in a way to use canvasdriver
export default function customElementify(component) {
  const CEPrototype = Object.create(HTMLCanvasElement.prototype)
  console.log(CEPrototype)
  CEPrototype.attachedCallback = function attachedCallback() { //eslint-disable-line
    const self = this //eslint-disable-line
    self._cyclejsProps$ = xs.create() //eslint-disable-line
    const {run} = Cycle(component, {
      Canvas: makeCanvasDriver(self, {width: 1000, height: 1000}),
      props: () => self._cyclejsProps$,
    })
    console.log('yoo')
    self._cyclejsDispose = run() //eslint-disable-line
    self._cyclejsProps = makePropsObject(self) //eslint-disable-line
    self._cyclejsProps$.shamefullySendNext(self._cyclejsProps)
  }

  CEPrototype.detachedCallback = function detachedCallback() { //eslint-disable-line
    (this)._cyclejsDispose() //eslint-disable-line
  }

  CEPrototype.attributeChangedCallback = function  attributeChangedCallback(attrName) { //eslint-disable-line
    const self = this //eslint-disable-line
    if (!self._cyclejsProps) return
    self._cyclejsProps[attrName] = self.attributes.getNamedItem(attrName).value //eslint-disable-line
    self._cyclejsProps$.shamefullySendNext(self._cyclejsProps)
  }

  return CEPrototype
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
