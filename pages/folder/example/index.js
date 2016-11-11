import {PageTemplate} from 'templates/default'
import md from 'utils/snabbdowm'

export default PageTemplate({
  title: `Coucou les copains`,
  content: md`\
## Ici = Page d'exemple oui oui ou pas. Trump won the elections lol

* [-> vers page d'accueil](/)
* [-> vers page d'exemple enfouie](/folder/example.html)`,
})
