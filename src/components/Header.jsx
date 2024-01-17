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
          {buttonList.map((name, index) => {
            return (
              <button
                key={index}
                id={name}
                onClick={(e) => {
                  setState(e.target.id);
                  handleFilter(e.target.id);
                }}
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
