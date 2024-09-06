import customCss from "./Recomendations.module.css";
import { productos } from "../utils/products";
import { Card } from "./Card";
import Suscribe from "./Suscribe";
import { useContext, useEffect } from "react";
import { BotonContext } from "../Context/Context";

export default function Recomendations({ handleOpenModal }) {
  const { prods } = useContext(BotonContext);

  useEffect(() => {
    
  }, [prods]);

  const traerProductos10Random = () => {
    const productosCards = [];
    const usadosIndices = new Set();

    const maxProductos = Math.min(prods.length, 10); // Limita el máximo a 10 o menos si hay menos productos.

    while (usadosIndices.size < maxProductos) {
      const randomIndex = Math.floor(Math.random() * prods.length);

      if (!usadosIndices.has(randomIndex)) {
        usadosIndices.add(randomIndex);
        productosCards.push(
          <Card 
            key={randomIndex} 
            producto={prods[randomIndex]} 
            onClick={() => handleOpenModal(prods[randomIndex])}
          />
        );
      }
    }

    return productosCards;
  };

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
  );
}