import {PageTemplate} from 'templates/default'
import md from 'markdown-string'
import {span} from '@cycle/dom'
import virtualize from 'snabbdom-virtualize'


export default PageTemplate ({
  title: `Coucou les copains`,
  content: virtualize(md`\
## Ici = Page d'exemple 

* [-> vers page d'accueil](/)
* [-> vers page d'exemple enfouie](/folder/example.html)`,
  ),
})
