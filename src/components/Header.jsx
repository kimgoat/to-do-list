import React, { useState } from "react";
import styles from "./Header.module.css";
import Button from "./Button";

export default function Header({ handleFilter }) {
  const buttonList = ["All", "Active", "Completed"];
  const [state, setState] = useState("All");

  return (
    <>
      <div className={styles.container}>
        header
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
    </>
  );
}
