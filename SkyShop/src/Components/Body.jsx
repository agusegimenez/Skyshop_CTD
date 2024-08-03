import "../index.css"
import Categories from "./Categories"
import Recomendations from "./Recomendations"
// import Searcher from "./Searcher"
import customCss from "./Body.module.css"

export default function Body() {
  return (
    <div className={customCss.bodyDiv}>
        <Categories />
        <Recomendations />
    </div>
  )
}