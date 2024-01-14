import styles from "./MainBoard.module.css";
import { Resizable } from "re-resizable";
import Header from "./Header";
import List from "./List";
import SearchBar from "./SearchBar";
import TimeTimer from "./TimeTimer";
import { useEffect, useState } from "react";

export default function MainBoard() {
  const [itemFilter, setItemFilter] = useState("All");

  const handleFilter = (state) => {
    setItemFilter(state);
  };

  return (
    <>
      {/* <TimeTimer /> */}
      <div className={styles.container}>
        <Resizable
          defaultSize={{ width: 500, height: 600 }}
          minHeight={400}
          maxHeight={700}
          minWidth={400}
          maxWidth={900}
          className={styles.test}
        >
          <Header handleFilter={handleFilter} />
          <List itemFilter={itemFilter} />
          {/* <SearchBar /> */}
        </Resizable>
      </div>
    </>
  );
}
