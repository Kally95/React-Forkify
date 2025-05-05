import styles from "./Pagination.module.css";

export default function Pagination({
  total_recipes,
  currentPage,
  onPageChange,
}) {
  const itemsPerPage = 10;
  const maxPage = Math.ceil(total_recipes / itemsPerPage);

  function handleClick(page) {
    if (page < 1 || page > maxPage) return;
    onPageChange(page);
  }

  return (
    <div className={styles["pagination-container"]}>
      <button
        className={styles["pagination-button"]}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      <button
        className={styles["pagination-button"]}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === maxPage}
      >
        &gt;
      </button>
    </div>
  );
}
