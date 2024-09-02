import { useEffect, useRef, useState } from "react";
import customCss from "./Searcher.module.css"
import { productos } from "../utils/products";

export default function Searcher() {

  const [isTyping, setIsTyping] = useState(false);
  const [typingContent, setTypingContent] = useState("");
  const productNames = productos.map(product => product.nombre);

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

  const renderMatches = (matches) => {
    return (
      <div
        className={customCss.divSearchRecs}
        style={{ display: matches.length === 0 ? "none" : "block" }}
        ref={recommendationsRef}
      >
        <div className={customCss.searchRecs}>
          {matches.map((match, index) => (
            <a key={index}>{match}</a>
          ))}
        </div>
      </div>
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
            <input ref={inputRef} className={customCss.searcherInput} type="search" id="buscador" onChange={(e) => handleSearch(e)}/>
            <a>
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