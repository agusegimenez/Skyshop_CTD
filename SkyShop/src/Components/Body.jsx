// Body.jsx
import Categories from "./Categories";
import Recomendations from "./Recomendations";
import customCss from "./Body.module.css";

export default function Body({ handleOpenModal }) {
  return (
    <div className={customCss.bodyDiv}>
      <Categories />
      <Recomendations handleOpenModal={handleOpenModal} />
    </div>
  );
}