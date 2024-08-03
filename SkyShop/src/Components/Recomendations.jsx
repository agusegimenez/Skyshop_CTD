// import "../index.css"
import customCss from "./Recomendations.module.css"
import { productos } from "../utils/products"
import { Card } from "./Card"
import { Link } from "react-router-dom";

export default function Recomendations() {

    const traerProductos10Random = () => {
        const productosCards = [];
        const usadosIndices = new Set();

        while (usadosIndices.size < 10) {
            const randomIndex = Math.floor(Math.random() * productos.length);

            if (!usadosIndices.has(randomIndex)) {
                usadosIndices.add(randomIndex);
                productosCards.push(<Card key={randomIndex} producto={productos[randomIndex]} />);
            }
        }

        return productosCards;
    }

  return (
    <section className={customCss.recomendaciones}>
        <div className={customCss.divTitle}>
            <h3 className={customCss.recomendationsTitle}>Recomendaciones</h3>
        </div>
        <div className={customCss.divCards}>
            {traerProductos10Random()}
        </div>
        <button className={customCss.recomendacionesBtn}>Ver más</button>
    </section>
  )
}
