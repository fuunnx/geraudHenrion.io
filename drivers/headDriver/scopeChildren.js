export function scopeChildren (nameSpace) {
  return vnode => ({
    ...vnode,
    children: vnode.children.map(c => ({...c, sel: c.sel + nameSpace})),
  })
}
