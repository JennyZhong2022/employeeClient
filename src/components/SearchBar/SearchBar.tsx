import { useEffect, useState } from "react";
import styles from "./SearchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setSearchTerm } from "../../redux/searchSlice";

const SearchBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    dispatch(setSearchTerm(inputValue.toLowerCase()));

    // setInputValue("");
  };

  console.log("searchTerm", searchTerm);

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.searchInput}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search name..."
      />

      <button className={styles.searchButton} type="submit">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default SearchBar;
