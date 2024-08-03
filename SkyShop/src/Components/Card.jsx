// import "../index.css"
import customCss from "./Card.module.css"

export const Card = ({producto}) => {
    const {imagen, nombre, precio, id} = producto;

  return (
    <article className={customCss.card} key={id}>
        <div className={customCss.divImg}>
          <img src={imagen} />
        </div>
        <div className={customCss.divNombreYPrecio}>
          <h3>{nombre}</h3>
          <p id="precio">${precio}</p>
        </div>
    </article>
  )
}