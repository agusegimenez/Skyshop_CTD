import "../index.css"

export const Card = ({producto}) => {
    const {imagen, nombre, precio, id} = producto;

  return (
    <article className="card" key={id}>
        <img src={imagen} />
        <h2>{nombre}</h2>
        <p>{precio}</p>
        <button>Ver detalle</button>
    </article>
  )
}
