import Modal from "./Modal";
import classes from "./AddRecipeModal.module.css";
import { useModal } from "../../contexts/ModalContextProvider";
import FormField from "../form/FormField";
import IngredientInput from "../form/IngredientInput";
import { API_KEY } from "../../utils/utils";
import { useRecipe } from "../../contexts/RecipesContextProvider";

export default function AddRecipeModal() {
  const { closeModal, openModal } = useModal();
  const { setBookmarks, bookmarks } = useRecipe();

  console.log(bookmarks);
  async function submitRecipe(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const recipe = {
      title: formData.get("title"),
      source_url: formData.get("source_url"),
      image_url: formData.get("image_url"),
      publisher: formData.get("publisher"),
      cooking_time: +formData.get("cooking_time"),
      servings: +formData.get("servings"),
      ingredients: [],
    };

    for (let i = 1; i <= 10; i++) {
      const quantity = formData.get(`ingredient-${i}-quantity`);
      const unit = formData.get(`ingredient-${i}-unit`);
      const description = formData.get(`ingredient-${i}-ingredient`);

      if (description) {
        recipe.ingredients.push({
          quantity: quantity ? +quantity : null,
          unit,
          description,
        });
      }
    }

    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recipe),
        }
      );
      const result = await res.json();
      const newRecipe = result.data.recipe;
      openModal("success");
      setBookmarks((prevBookmarks) => [...prevBookmarks, newRecipe]);
    } catch (err) {
      console.error("Failed to submit recipe:", err);
    }
  }

  return (
    <Modal name="addRecipe">
      <h1 className={classes["title"]}>ADD A NEW RECIPE 🍔</h1>
      <form id="addRecipeForm" onSubmit={submitRecipe}>
        <h3>RECIPE DATA (4 SERVINGS)</h3>
        <div className={classes["new-recipe-data"]}>
          <FormField label="Title" name="title" />
          <FormField label="Publisher" name="publisher" min={4} />
          <FormField label="Cooking Time" name="cooking_time" min={0} />
          <FormField label="Servings" name="servings" min={1} />
          <FormField label="Source URL" name="source_url" min={4} />
          <FormField label="Image URL" name="image_url" min={4} />
        </div>
        <h3>INGREDIENTS</h3>
        <div className={classes["ingredient-input-container"]}>
          <div className={classes["ingredient-input-group-1"]}>
            <IngredientInput index={1} />
            <IngredientInput index={2} />
            <IngredientInput index={3} />
            <IngredientInput index={4} />
            <IngredientInput index={5} />
          </div>

          <div className={classes["ingredient-input-group-2"]}>
            <IngredientInput index={6} />
            <IngredientInput index={7} />
            <IngredientInput index={8} />
            <IngredientInput index={9} />
            <IngredientInput index={10} />
          </div>
        </div>
        <div className={classes["modal-button-container"]}>
          <button
            type="submit"
            form="addRecipeForm"
            className={classes["button"]}
          >
            Submit
          </button>
          <button
            onClick={closeModal}
            type="submit"
            className={classes["button"]}
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
}
