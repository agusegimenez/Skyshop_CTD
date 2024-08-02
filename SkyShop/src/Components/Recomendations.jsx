import "../index.css"
import { productos } from "../utils/products"
import { Card } from "./Card"

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
    <section className="recomendaciones">
        {traerProductos10Random()}
    </section>
  )
}
