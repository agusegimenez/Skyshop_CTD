import customCss from "./Suscribe.module.css"
const Suscribe = () => {
  return (
    <section className={customCss.ofertasMail}>
        <h2>Reicibí nuestras promociones y ofertas vía email</h2>
        <div className={customCss.btnInput}>
            <input type="email" placeholder='Ingresa tu e-mail' id='email' required/>
            <button>Suscribirme</button>
        </div>
    </section>
  )
}

export default Suscribe