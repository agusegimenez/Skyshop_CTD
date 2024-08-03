// import "../index.css"
import customCss from "./Categories.module.css"
import Searcher from "./Searcher"

export default function Categories() {
  return (
    <section className={customCss.categoriesSection}>
        <h3>Categorías</h3>
        <Searcher/>
    </section>
  )
}
