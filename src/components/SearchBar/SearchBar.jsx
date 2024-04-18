import css from "./SearchBar.module.css";
import { CiSearch } from "react-icons/ci";
export default function SearchBar({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const nameImage = form.elements.search.value;
    onSubmit(nameImage);
    form.reset();
  };

  return (
    <header className={css.headerForm}>
      <form id="searchForm" onSubmit={handleSubmit} className={css.mainForm}>
        <input
          className={css.serachInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
        <button type="submit" className={css.btn}>
          <CiSearch />
        </button>
      </form>
    </header>
  );
}
