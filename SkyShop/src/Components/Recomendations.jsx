import customCss from "./Recomendations.module.css";
import { Card } from "./Card";
import { useContext, useEffect, useState } from "react";
import { BotonContext } from "../Context/Context";

export default function Recomendations({ handleOpenModal }) {
  const { prods, getProds } = useContext(BotonContext);
  const [randomProds, setRandomProds] = useState([]);
  const [visibleProds, setVisibleProds] = useState(10); // Inicialmente mostramos 10 productos

  useEffect(() => {
    getProds();
  }, []);

  useEffect(() => {
    if (prods.length > 0) {
      // Si hay productos, selecciona 10 aleatorios
      setRandomProds(traerProductos10Random(prods));
    }
  }, [prods]);

  const traerProductos10Random = (productos) => {
    const usadosIndices = new Set();
    const productosAleatorios = [];
    const maxProductos = Math.min(productos.length, 10); // Limitar a 10 o menos si hay menos productos

    while (usadosIndices.size < maxProductos) {
      const randomIndex = Math.floor(Math.random() * productos.length);

      if (!usadosIndices.has(randomIndex)) {
        usadosIndices.add(randomIndex);
        productosAleatorios.push(productos[randomIndex]);
      }
    }

    return productosAleatorios;
  };

  const traerProductosVisibles = () => {
    const productosCards = [];

    // Primero mostramos los productos aleatorios
    randomProds.forEach((producto, index) => {
      productosCards.push(
        <Card 
          key={`random-${index}`} 
          producto={producto} 
          onClick={() => handleOpenModal(producto)}
        />
      );
    });

    // Luego, si se hace clic en "Ver más", mostramos los productos restantes en orden
    for (let i = 10; i < Math.min(prods.length, visibleProds); i++) {
      productosCards.push(
        <Card 
          key={`prod-${i}`} 
          producto={prods[i]} 
          onClick={() => handleOpenModal(prods[i])}
        />
      );
    }

    return productosCards;
  };

  const handleVerMas = () => {
    setVisibleProds(prev => prev + 10); // Aumenta la cantidad visible en 10
  };

  return (
    <section className={customCss.recomendaciones}>
      <div className={customCss.divTitle}>
        <h3 className={customCss.recomendationsTitle}>Recomendaciones</h3>
      </div>
      <div className={customCss.divCards}>
        {traerProductosVisibles()}
      </div>
      {visibleProds < prods.length && (
        <button 
          className={customCss.recomendacionesBtn} 
          onClick={handleVerMas}
        >
          Ver más
        </button>
      )}
    </section>
  );
}