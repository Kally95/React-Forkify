export default function IngredientInput({ index }) {
  return (
    <label>
      Ingredient {index}
      <input
        type="text"
        name={`ingredient-${index}-ingredient`}
        placeholder="Quantity"
      />
      <input
        type="text"
        name={`ingredient-${index}-ingredient`}
        placeholder="Unit"
      />
      <input
        type="text"
        name={`ingredient-${index}-ingredient`}
        placeholder="Ingredient"
      />
    </label>
  );
}
