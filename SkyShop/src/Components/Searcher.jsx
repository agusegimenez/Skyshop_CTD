// import "../index.css"
import customCss from "./Searcher.module.css"

export default function Searcher() {
  return (
    <>
        <input className={customCss.searcherInput} type="search" placeholder="Busca tu producto" id="buscador"/>
    </>
  )
}
