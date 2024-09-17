// Body.jsx
import Categories from "./Categories";
import Recomendations from "./Recomendations";
import customCss from "./Body.module.css";
import Searcher from "./Searcher";
import { useState } from "react";
import SearchResults from "./SearchResults";
import { productos } from "../utils/products";
import WhatsAppBoton from "./WhatsAppBoton";

export default function Body({ handleOpenModal }) {

  const [searchResultProds, setSearchResultProds] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);

  const filterProductsByCategory = (categoryName) => {
    const filtered = productos.filter((product) => product.categoria === categoryName); // Usamos "categoria"
    setFilteredProducts(filtered);
  };

  return (
    <div className={customCss.bodyDiv}>
      <Searcher setSearchResultProds={setSearchResultProds}/>
      <Categories filterProductsByCategory={filterProductsByCategory}/>
      {searchResultProds !== null && <SearchResults products={searchResultProds} />}
      {filteredProducts !== null && <SearchResults products={filteredProducts} />}
      <Recomendations handleOpenModal={handleOpenModal} />
      <WhatsAppBoton/>
    </div>
  );
}