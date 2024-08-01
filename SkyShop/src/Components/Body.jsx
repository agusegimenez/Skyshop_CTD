import "../index.css"
import Categories from "./Categories"
import Recomendations from "./Recomendations"
import Searcher from "./Searcher"

export default function Body() {
  return (
    <div className="body-div">
        <Searcher />
        <Categories />
        <Recomendations />
    </div>
  )
}