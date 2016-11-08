export function reduceComponents (component$) {
  return component$
    .map(x => x.children)
    .filter(x => !!x)
    .reduce((acc, x) => acc.concat(x), [])
    .reverse()
    .filter(unique())
    .reverse()
    // .map((c) => {
      // const className = (c.className ? c.className + ' ' : '') + 'next-head'
      // return React.cloneElement(c, { className }) //eslint-disable-line
    // })
}

// returns a function for filtering head child elements
// which shouldn't be duplicated, like <title/>.
function unique () {
  const METATYPES = ['name', 'httpEquiv', 'charSet', 'itemProp']
  const tags = new Set()
  const metaTypes = new Set()
  const metaCategories = {}

  return (h) => {
    switch (h.type) {
      case 'title':
      case 'base':
        if (tags.has(h.type)) return false
        tags.add(h.type)
        break
      case 'meta':
        for (let i = 0, len = METATYPES.length; i < len; i++) { //eslint-disable-line
          const metatype = METATYPES[i]
          if (!h.props.hasOwnProperty(metatype)) continue

          if (metatype === 'charSet') {
            if (metaTypes.has('charSet')) return false
            metaTypes.add('charSet')
          } else {
            const category = h.props[metatype]
            const categories = metaCategories[metatype] || new Set()
            if (categories.has(category)) return false
            categories.add(category)
            metaCategories[metatype] = categories //eslint-disable-line
          }
        }
        break
    }
    return true
  }
}
