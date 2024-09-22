import { categories } from "../utils/categories";
import customCss from "./Categories.module.css";
import Category from "./Category";

export default function Categories({ categoriesSelected, setCategoriesSelected }) {

  const handleCategoriesSelected = (category) => {
    let realCategory;

    if (category === "Salud & Belleza") {
      realCategory = "SALUD_Y_BELLEZA";
    } else if (category === "Mascotas") {
      realCategory = "MASCOTAS";
    } else if (category === "Oficina") {
      realCategory = "OFICINA";
    } else if (category === "Alimentos") {
      realCategory = "ALIMENTOS";
    }

    if (categoriesSelected.includes(realCategory)) {
      setCategoriesSelected(categoriesSelected.filter((cat) => cat !== realCategory));
    } else {
      setCategoriesSelected([...categoriesSelected, realCategory]);
    }
  };

  const renderCategories = () => {
    return categories.map((category) => (
      <Category key={category.id} category={category} handleCategoriesSelected={handleCategoriesSelected} categoriesSelected={categoriesSelected}/>
    ));
  };

  return (
      <section className={customCss.categoriesSection}>
        {renderCategories()}
      </section>
  );
}