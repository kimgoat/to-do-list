import React, { useState } from "react";
import styles from "./Header.module.css";

export default function Header({ handleFilter, children }) {
  const buttonList = ["All", "Active", "Completed"];
  const [state, setState] = useState("All");

  return (
    <>
      <div className={styles.container}>
        {children}
        <div className={styles.filter_container}>
          {buttonList.map((name) => {
            return (
              <button
                key={name}
                id={name}
                onClick={(e) => {
                  setState(e.target.id);
                  handleFilter(e.target.id);
                }}
                className={`${styles.filter} ${
                  state === name && styles.selected
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
