import Header from "./components/header/Header";
import classes from "./App.module.css";
import SearchResults from "./components/search/SearchResults";
import { RecipeProvider } from "./contexts/RecipesContextProvider";
import RecipeDetails from "./components/recipe/RecipeDetails";
import { ModalProvider } from "./contexts/ModalContextProvider";
import AddRecipeModal from "./components/modal/AddRecipeModal";
import SuccessModal from "./components/modal/SuccessModal";
function App() {
  return (
    <>
      <RecipeProvider>
        <ModalProvider>
          <div className={classes["main-container"]}>
            <div className={classes["header-wrapper"]}>
              <Header />
            </div>
            <div className={classes["main-content"]}>
              <SearchResults />
              <RecipeDetails />
            </div>
          </div>
          <AddRecipeModal />
          <SuccessModal />
        </ModalProvider>
      </RecipeProvider>
    </>
  );
}

export default App;
