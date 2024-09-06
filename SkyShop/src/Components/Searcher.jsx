import { useContext, useEffect, useRef, useState } from "react";
import customCss from "./Searcher.module.css"
import { productos } from "../utils/products";
import { BotonContext } from "../Context/Context";

export default function Searcher({setSearchResultProds}) {

  const [isTyping, setIsTyping] = useState(false);
  const [typingContent, setTypingContent] = useState("");
  const { searchProdsByName, prods} = useContext(BotonContext);
  const productNames = prods.map(product => product.name);
  const inputRef = useRef(null);
  const recommendationsRef = useRef(null);

  const handleTypingContent = (e) => {
    setTypingContent(e.target.value);
  }

  const mapMatches = (stringValue) => {
    if (stringValue === "") return [];
    const lowercasedSearchValue = stringValue.toLowerCase();
    return productNames.filter((item) =>
      item.toLowerCase().includes(lowercasedSearchValue)
    );
  };

  const handleIsTyping = (e) => {
    const matches = mapMatches(e.target.value);
    setIsTyping(matches.length > 0);
  };

  useEffect(() => {
  }, [typingContent, isTyping])
  

  const handleSearch = (e) => {
    handleIsTyping(e);
    handleTypingContent(e);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        recommendationsRef.current &&
        !recommendationsRef.current.contains(event.target)
      ) {
        setIsTyping(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchBtn = () => {
    setSearchResultProds(searchProdsByName(typingContent));
  }

  const handleClickSearchRecs = (searchRecomendation) => {
    setTypingContent(searchRecomendation);
    handleSearchBtn();
    setTypingContent("");
  }

  // ejecuta la búsqueda cuando se apreta enter estando en el input de busqueda
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchBtn();
    }
  };

  const renderMatches = (matches) => {
    return (
      <div
        className={customCss.divSearchRecs}
        style={{ display: matches.length === 0 ? "none" : "block" }}
        ref={recommendationsRef}
      >
        <div className={customCss.searchRecs}>
          {matches.map((match, index) => (
            <a key={index} onClick={() => handleClickSearchRecs(match)}>{match}</a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className={customCss.searcherSect}>
        <div className={customCss.textDiv}>
          <h1>Delivery de Drones</h1>
          <h2>
            El delivery del cielo.<br/>
            ¡Esperalo de tranquis<br/>
            en tu balcón!
          </h2>
          <div className={customCss.inputDiv}>
            <input ref={inputRef} className={customCss.searcherInput} onKeyDown={handleKeyDown} type="search" id="buscador" onChange={(e) => handleSearch(e)}/>
            <a onClick={handleSearchBtn}>
              <img src="/search.png"/>
            </a>
          </div>
          {isTyping && renderMatches(mapMatches(typingContent))}
        </div>
        <div className={customCss.divImg}>
          <img src="/man-with-drone-delivery.png" alt="Imagen de persona recibiendo delivery de drone"/>
        </div>
    </section>
  )
}