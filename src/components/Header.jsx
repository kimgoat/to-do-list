import React, { useState, useContext } from "react";
import styles from "./Header.module.css";
import Button from "./Button";
import { DarkModeContext } from "../context/DarkModeContext";

export default function Header({ handleFilter }) {
  const buttonList = ["All", "Active", "Completed"];
  const [state, setState] = useState("All");
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <>
      {darkMode ? (
        <div className={styles.container}>
          <button onClick={() => toggleDarkMode()}>darkmode</button>
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
      ) : (
        <div className={styles.container}>
          <button onClick={() => toggleDarkMode()}>whiteMode</button>
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
      )}
    </>
  );
}
