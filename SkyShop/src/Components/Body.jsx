// Body.jsx
import Categories from "./Categories";
import Recomendations from "./Recomendations";
import customCss from "./Body.module.css";
import Searcher from "./Searcher";
import { useState } from "react";
import SearchResults from "./SearchResults";

export default function Body({ handleOpenModal }) {

  const [searchResultProds, setSearchResultProds] = useState(null);

  return (
    <div className={customCss.bodyDiv}>
      <Searcher setSearchResultProds={setSearchResultProds}/>
      <Categories />
      {searchResultProds !== null && <SearchResults products={searchResultProds} />}
      <Recomendations handleOpenModal={handleOpenModal} />
    </div>
  );
}