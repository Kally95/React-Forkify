import { FaMagnifyingGlass, FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import logo from "../../assets/logo.png";
import classes from "./Header.module.css";
import { useContext } from "react";
import { RecipesContext } from "../../contexts/RecipesContext";
import SearchResultItem from "../search/SearchResultItem";
import { useModal } from "../../contexts/ModalContextProvider";
export default function Header() {
  const { fetchData, bookmarks } = useContext(RecipesContext);
  const { openModal } = useModal();
  function handleRecipeSearch(formData) {
    const query = formData.get("query");
    if (!query) return;

    const url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`;
    fetchData(url);
  }

  return (
    <header className={classes["main-header"]}>
      <img
        className={classes["main-header-logo"]}
        src={logo}
        alt="Forkify's logo of a fork and spoon"
      />

      <form
        className={classes["main-header__search-form"]}
        action={handleRecipeSearch}
      >
        <input
          className={classes["main-header__search-form-input"]}
          type="text"
          placeholder="Search recipes..."
          name="query"
        />
        <button className={classes["main-header__search-form-btn"]}>
          <span>SEARCH</span> <FaMagnifyingGlass />
        </button>
      </form>

      <nav className={classes["main-header__nav-items"]}>
        <ul className={classes["main-header__nav-list"]}>
          <li className={classes["main-header__nav-list-item"]}>
            <button
              className={`${classes["main-header__nav-btn"]} ${classes["main-header__nav-btn--add-recipe"]}`}
              onClick={() => openModal("addRecipe")}
            >
              <span>ADD RECIPE</span> <FaEdit />
            </button>
          </li>
          <li className={classes["main-header__nav-list-item"]}>
            <div className={classes["dropdown"]}>
              <button
                className={`${classes["main-header__nav-btn"]} ${classes["main-header__nav-btn--bookmark"]}`}
              >
                <span>BOOKMARKS</span> <FaRegBookmark />
              </button>

              <div className={classes["dropdown-menu"]}>
                {bookmarks && (
                  <ul className={classes["dropdown-menu-list"]}>
                    {bookmarks.map((b) => (
                      <li key={b.id}>
                        <SearchResultItem
                          id={b.id}
                          image={b.image_url}
                          publisher={b.publisher}
                          title={b.title}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
