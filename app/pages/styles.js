import {div, button} from '@cycle/dom'
import xs from 'xstream'


function styled (style_) {
  return vNodeModifier({
    attributes: x => mergeDeep(computeStyles(x))(x),
  })

  function computeStyles (context) {
    return {
      style: mapObj((prop) =>
      typeof prop === 'function'
        ? String(prop(context))
        : String(prop)
      )(style_),
    }
  }
}

function mapObj (fn) {
  return obj => Object.entries(obj).reduce((acc, [key, value]) => ({...acc, [key]: fn(value)}), {})
}

const concat = (x) => (y) => (Array.isArray(x) && Array.isArray(y))
  ? x.concat(y)
  : [x, y].join('')



const mergeDeep = (target) => (source) => {
  let output = Object.assign({}, target)
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] })
        else
          output[key] = mergeDeep(target[key])(source[key])
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }
  return output
}

function extend (...args) {
  const [
    selector,
    attributes,
    children,
  ] = identifyArgs(...args)
  return vNodeModifier({
    selector: concat(selector),
    attributes: mergeDeep(attributes),
    children: concat(children),
  })
}

function vNodeModifier ({
  selector: updateSelector = x => x,
  attributes: updateAttributes = x => x,
  children: updateChildren = x => x}) {
  return (component) => vNode(([sel, attrs, children_]) => {
    const selector = updateSelector(sel)
    const attributes = updateAttributes(attrs)
    const children = updateChildren(children_)
    return selector
      ? component(selector, attributes, children)
      : component(attributes, children)
  })
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

function identifyArgs (first, b, c) {
  let selector = ''
  let attributes = {}
  let children = []

  if (isSelector(first)) {
    selector = first
    if (b && c) (attributes = b, children = c)
    if (b && Array.isArray(b) && !c) (children = b)
    if (b && !Array.isArray(b) && !c) (attributes = b)
  }
  if (!isSelector(first)) {
    if (first && b) (attributes = first, children = b)
    if (first && Array.isArray(first) && !b) (children = first)
    if (first && !Array.isArray(first) && !b) (attributes = first)
  }

  return [
    selector,
    attributes,
    children,
  ]
}

function isValidString(param) {
  return typeof param === 'string' && param.length > 0
}

function isSelector(param) {
  return isValidString(param) && (param[0] === '.' || param[0] === '#')
}

const vNode = (fn) => (...args) => fn(identifyArgs(...args))

const typeButton = extend({
  attrs: {
    type: 'button',
  },
})

const blueBackground = extend({
  style: {
    'background-color': 'blue',
    'color': 'white',
  },
})

const lotOfPadding = extend({
  style: {
    'padding': '20px',
  },
})

const conditionnalStyle = styled({
  'border': ({attrs: {disabled}}) => disabled
    ? '2px solid #fff'
    : '10px dotted #000',
})

const hasCookies = vNodeModifier({children: (xs) => (['🍪 ', ...xs, ' 🍪'])})
const defaultButton = typeButton(button)
const primaryButton = blueBackground(lotOfPadding(defaultButton))
const cookieButton = hasCookies(primaryButton)
const conditionnedButton = conditionnalStyle(defaultButton)

export function Styles () {
  const vtree$ = xs.of(div([
    defaultButton(['Hellooo']),
    primaryButton(['primaryy']),
    cookieButton(['Cookiez']),
    conditionnedButton({attrs: {disabled: true}}, ['Disabled']),
    conditionnedButton({attrs: {disabled: false}}, ['Not disabled']),
  ]))
  const sinks = {
    DOM: vtree$.debug(),
  }
  return sinks
}
export default Styles


// const defaultButton = styled(button, {
//   'background-color': ({enabled}) => enabled ? 'blue' : 'grey',
//   'color': 'white',
// })
