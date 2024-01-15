import styles from "./MainBoard.module.css";
import { Resizable } from "re-resizable";
import Header from "./Header";
import List from "./List";
import { useState } from "react";
import { DarkModeProvider } from "../context/DarkModeContext";

export default function MainBoard() {
  const [itemFilter, setItemFilter] = useState("All");

  const handleFilter = (state) => {
    setItemFilter(state);
  };

  return (
    <DarkModeProvider>
      <div className={styles.container}>
        <Resizable
          defaultSize={{ width: 500, height: 600 }}
          minHeight={600}
          maxHeight={600}
          minWidth={400}
          maxWidth={900}
          className={styles.resizable_container}
        >
          <Header handleFilter={handleFilter} />
          <List itemFilter={itemFilter} />
        </Resizable>
      </div>
    </DarkModeProvider>
  );
}
