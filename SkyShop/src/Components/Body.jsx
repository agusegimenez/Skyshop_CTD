// Body.jsx
import Categories from "./Categories";
import Recomendations from "./Recomendations";
import customCss from "./Body.module.css";
import Searcher from "./Searcher";

export default function Body({ handleOpenModal }) {
  return (
    <div className={customCss.bodyDiv}>
      <Searcher />
      <Categories />
      <Recomendations handleOpenModal={handleOpenModal} />
    </div>
  );
}