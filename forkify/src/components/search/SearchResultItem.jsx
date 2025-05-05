import classes from "./SearchResultItem.module.css";
import { RecipesContext } from "../../contexts/RecipesContext";
import { useContext } from "react";

export default function SearchResultItem({ id, image, publisher, title }) {
  const { fetchRecipeById } = useContext(RecipesContext);

  return (
    <div
      className={classes["search-result-item"]}
      onClick={() => fetchRecipeById(id)}
    >
      <img
        className={classes["search-result-item__image"]}
        src={image}
        alt={`An image of ${title}`}
      />
      <div className={classes["search-result-item__info"]}>
        <p className={classes["search-result-item__title"]}>{title}</p>
        <p className={classes["search-result-item__publisher"]}>{publisher}</p>
      </div>
    </div>
  );
}
