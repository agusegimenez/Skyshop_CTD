// import "../index.css"
import customCss from "./Card.module.css"

export const Card = ({producto}) => {
    const {imagen, nombre, precio, id} = producto;

  return (
    <article className={customCss.card} key={id}>
        <img src={imagen} />
        <div>
          <h2>{nombre}</h2>
          <p>{precio}</p>
        </div>
    </article>
  )
}
