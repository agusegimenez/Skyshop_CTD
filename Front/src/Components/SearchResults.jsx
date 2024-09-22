import customCss from "./Recomendations.module.css";
import { Card } from "./Card";
import { useContext, useEffect } from "react";
import { BotonContext } from "../Context/Context";

export default function SearchResults({ handleOpenModal, products }) {

  useEffect(() => {
    
  }, [products]);

  const traerProductosPrimeros10 = () => {
    const productosCards = [];
    const maxProductos = Math.min(products.length, 10);
    
    for (let i = 0; i < maxProductos; i++) {
      productosCards.push(
        <Card
          key={i}
          producto={products[i]}
          onClick={() => handleOpenModal(products[i])}
        />
      );
    }
    return productosCards;
  };

  return (
    <section className={customCss.recomendaciones}>
      <div className={customCss.divTitle}>
        <h3 className={customCss.recomendationsTitle}>Resultados de Búsqueda</h3>
      </div>
      <div className={customCss.divCards}>
        {traerProductosPrimeros10()}
      </div>
      {products.length >= 11 && <button className={customCss.recomendacionesBtn}>Ver más</button>}
    </section>
  );
}
