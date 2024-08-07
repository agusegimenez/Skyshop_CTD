import { categories } from "../utils/categories";
import customCss from "./Categories.module.css"
import Category from "./Category";

export default function Categories() {

  const renderCategories = () => {
    const categoriesArray = [];
    categories.forEach(category => {
      categoriesArray.push( <Category key={category.id} category={category}/>)
    });
    return categoriesArray;
  }

  return (
    <section className={customCss.categoriesSection}>
        {renderCategories()}
    </section>
  )
}
