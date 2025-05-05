import { useState, useCallback, useContext } from "react";
import { RecipesContext } from "./RecipesContext";

export function RecipeProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  const fetchData = useCallback(async (url, method = "GET", body = null) => {
    if (!url) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers:
          method !== "GET" ? { "Content-Type": "application/json" } : undefined,
        body: method !== "GET" && body ? JSON.stringify(body) : null,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(`${responseData.status}: ${responseData.message}`);
      }

      setData(responseData.data.recipes);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchRecipeById = useCallback(async (id) => {
    if (!id) return;

    setIsLoading(true);
    setError(null);
    console.log("here");
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(`${responseData.status}: ${responseData.message}`);
      }

      setCurrentRecipe(responseData.data.recipe);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <RecipesContext.Provider
      value={{
        isLoading,
        error,
        data,
        fetchData,
        fetchRecipeById,
        currentRecipe,
        bookmarks,
        setBookmarks,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipe() {
  return useContext(RecipesContext);
}
