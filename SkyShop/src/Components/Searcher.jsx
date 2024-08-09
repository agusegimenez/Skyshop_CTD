import customCss from "./Searcher.module.css"

export default function Searcher() {
  return (
    <section className={customCss.searcherSect}>
        <div className={customCss.textDiv}>
          <h1>Delivery de Drones</h1>
          <h2>
            El delivery del cielo.<br/>
            ¡Esperalo de tranquis<br/>
            en tu balcón!
          </h2>
          <div className={customCss.inputDiv}>
            <input className={customCss.searcherInput} type="search" id="buscador"/>
            <img src="/search.png"/>
          </div>
        </div>
        <div className={customCss.divImg}>
          <img src="/man-with-drone-delivery.png" alt="Imagen de persona recibiendo delivery de drone"/>
        </div>
    </section>
  )
}
