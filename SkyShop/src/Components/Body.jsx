import Categories from "./Categories";
import Recomendations from "./Recomendations";
import customCss from "./Body.module.css";
import Searcher from "./Searcher";
import { useState, useEffect, useContext } from "react";
import SearchResults from "./SearchResults";
import WhatsAppBoton from "./WhatsAppBoton";
import { BotonContext } from "../Context/Context";

export default function Body({ handleOpenModal }) {

  const [searchResultProds, setSearchResultProds] = useState(null);
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const {prods} = useContext(BotonContext);

  useEffect(() => {
    filterProductsByCategory();
  }, [categoriesSelected]);


  const filterProductsByCategory = () => {
    if (categoriesSelected.length === 0) {
      setSearchResultProds(null);
      return;
    }
    const filtered = prods.filter((product) =>
      categoriesSelected.includes(product.category)
    );
    setSearchResultProds(filtered);
  };

  return (
    <div className={customCss.bodyDiv}>
      <Searcher setSearchResultProds={setSearchResultProds} />
      <Categories categoriesSelected={categoriesSelected} setCategoriesSelected={setCategoriesSelected} />
      {searchResultProds !== null && <SearchResults products={searchResultProds} handleOpenModal={handleOpenModal} />}
      <Recomendations handleOpenModal={handleOpenModal} />
      <WhatsAppBoton />
    </div>
  );
}