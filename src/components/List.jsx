import React from "react";
import ListItem from "./ListItem";
import styles from "./List.module.css";

export default function List(props) {
  console.log(props);
  return (
    <>
      <div className={styles.container}>
        List Box
        <ListItem />
      </div>
    </>
  );
}
