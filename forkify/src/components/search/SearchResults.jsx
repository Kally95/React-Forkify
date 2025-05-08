import classes from "./SearchResults.module.css";
import { useState } from "react";
import { GoSmiley } from "react-icons/go";
import SearchResultItem from "./SearchResultItem";
import { PiSmileySad } from "react-icons/pi";
import Pagination from "../pagination/Pagination";
import { useRecipe } from "../../contexts/RecipesContextProvider";

export default function SearchResults() {
  const { data: recipes, error } = useRecipe();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (error) {
    return <p>Something went wrong, try again!</p>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipes = recipes?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className={classes["search-results"]}>
      {!recipes && (
        <p className={classes["search-results__message"]}>
          Start by searching for a recipe! <GoSmiley />
        </p>
      )}
      {recipes && recipes.length === 0 && (
        <p className={classes["search-results__message"]}>
          Oops, we couldn’t find any recipes matching your search{" "}
          <span>
            <PiSmileySad />
          </span>
        </p>
      )}
      <ul className={classes["search-results-list"]}>
        {currentRecipes?.map((recipe) => (
          <li key={recipe.id} className={classes["search-results-list__item"]}>
            <SearchResultItem
              id={recipe.id}
              image={recipe.image_url}
              publisher={recipe.publisher}
              title={recipe.title}
            />
          </li>
        ))}
      </ul>

      {recipes && recipes.length > 0 && (
        <Pagination
          total_recipes={recipes.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
}
