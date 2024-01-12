import React from "react";
import styles from "./Header.module.css";
import Button from "./Button";

export default function Header() {
  const buttonList = ["All", "Active", "Completed"];
  return (
    <>
      <div className={styles.container}>
        header
        {buttonList.map((name, index) => (
          <Button name={name} key={index} />
        ))}
      </div>
    </>
  );
}
