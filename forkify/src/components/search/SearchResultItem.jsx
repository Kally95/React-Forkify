import classes from "./SearchResultItem.module.css";
import { RecipesContext } from "../../contexts/RecipesContext";
import { useRecipe } from "../../contexts/RecipesContextProvider";

export default function SearchResultItem({ id, image, publisher, title }) {
  const { fetchRecipeById, currentRecipe } = useRecipe(RecipesContext);

  return (
    <div
      className={`${classes["search-result-item"]} ${
        currentRecipe?.id === id ? classes["active"] : ""
      }`}
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
