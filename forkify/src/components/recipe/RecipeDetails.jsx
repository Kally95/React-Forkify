import { useState, useEffect } from "react";
import classes from "./RecipeDetails.module.css";
import { FaSpinner } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { MdPeople } from "react-icons/md";
import Fraction from "fraction.js";
import { FaMinus, FaBookmark, FaRegBookmark, FaPlus } from "react-icons/fa";
import { useRecipe } from "../../contexts/RecipesContextProvider";
function formatQuantity(qty) {
  return qty ? new Fraction(qty).toFraction(true) : "";
}

export default function RecipeDetails() {
  const { currentRecipe, bookmarks, setBookmarks, isLoading } = useRecipe();
  const [baseServings, setBaseServings] = useState();
  const [servings, setServings] = useState();

  const multiplier = servings / baseServings;

  useEffect(() => {
    if (currentRecipe?.servings) {
      setBaseServings(currentRecipe.servings);
      setServings(currentRecipe.servings);
    }
  }, [currentRecipe]);

  if (isLoading) {
    return (
      <section className={classes["search-results"]}>
        <FaSpinner className={classes.spinner} />
      </section>
    );
  }

  if (!currentRecipe) {
    return (
      <div className={classes["no-recipe"]}>
        <p>Use the search bar to look for a recipe</p>
      </div>
    );
  }

  const isBookmarked = bookmarks.some((b) => b.id === currentRecipe.id);

  console.log(isBookmarked);

  function toggleBookmark() {
    setBookmarks((prev) => {
      const isAlreadyBookmarked = prev.some((b) => b.id === currentRecipe.id);
      return isAlreadyBookmarked
        ? prev.filter((b) => b.id !== currentRecipe.id)
        : [...prev, currentRecipe];
    });
  }

  const increaseServings = () => setServings((s) => s + 1);
  const decreaseServings = () => setServings((s) => Math.max(1, s - 1));

  return (
    <main className={classes["recipe-details-main"]}>
      <figure className={classes["recipe-details-figure"]}>
        <img
          src={currentRecipe.image_url || "/fallback.jpg"}
          alt={`A picture of ${currentRecipe.title}`}
          className={classes["recipe-image"]}
        />
        <figcaption className={classes["recipe-title-overlay"]}>
          {currentRecipe.title}
        </figcaption>
      </figure>

      <section className={classes["recipe-details"]}>
        <div className={classes["recipe-details-info"]}>
          <IoIosTimer className={classes["icon"]} />
          <span>{currentRecipe.cooking_time} mins</span>
        </div>

        <div className={classes["recipe-details-info"]}>
          <MdPeople className={classes["icon"]} />
          <span>{servings} servings</span>
          <div className={classes["servings-controls"]}>
            <button
              onClick={increaseServings}
              className={classes["icon-button"]}
            >
              <FaPlus />
            </button>
            <button
              onClick={decreaseServings}
              className={classes["icon-button"]}
            >
              <FaMinus />
            </button>
          </div>
        </div>
        <button
          onClick={toggleBookmark}
          className={classes["icon-button-bookmark"]}
        >
          {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </section>

      <div className={classes["recipe-details-ingredient"]}>
        <h3>RECIPE INGREDIENTS</h3>
        <ul className={classes["ingredient-list"]}>
          {currentRecipe.ingredients.map((ingredient, idx) => {
            const rawQty = ingredient.quantity * multiplier;
            const displayQty = formatQuantity(rawQty);

            return (
              <li key={idx}>
                <FaPlus />
                <span>
                  {displayQty} {ingredient.unit} {ingredient.description}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
