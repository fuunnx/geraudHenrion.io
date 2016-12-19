import dot from 'utils/dot'
export default (rules) => (className) => dot(rules[className])


/* EXAMPLE:
 * import makeLocaleRule from 'utils/makeLocaleRule'
 * const c = makeLocaleRule(styles)
 * div(c('myClassName'))
 */
