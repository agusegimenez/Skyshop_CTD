import { useEffect, useState } from "react";
import customCss from "./Category.module.css";

export default function Category({ category, handleCategoriesSelected, categoriesSelected}) {

  const { image, name, id } = category;
  const [normalCategory, setNormnalCategory] = useState("");

  const categorieToNormal = (cat) => {
    let realCategory;
    if (cat === "SALUD_Y_BELLEZA") {
      realCategory = "Salud & Belleza";
    } else if (cat === "MASCOTAS") {
      realCategory = "Mascotas";
    } else if (cat === "OFICINA") {
      realCategory = "Oficina";
    } else if (cat === "ALIMENTOS") {
      realCategory = "Alimentos";
    }
    return realCategory;        
  }

  const isSelected = categoriesSelected.includes(normalCategory);

  useEffect(() => {
    setNormnalCategory(categorieToNormal(name));
  }, [categoriesSelected])
  

  return (
    <article
      id={id}
      className={customCss.catArticle}
      onClick={() => handleCategoriesSelected(name)}
    >
      <div className={customCss.imageDiv}>
        <img src={image} alt={name} />
      </div>
      <h4>{name}</h4>
    </article>
  );
}