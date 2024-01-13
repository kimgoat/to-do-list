import React from "react";
import styles from "./ListItem.module.css";

export default function ListItem({ index, todo }) {
  return (
    <>
      <div className={styles.container}>
        <p key={index}>
          {todo.title} {index}
        </p>
        <button key={index} onClick={() => console.log(index)}>
          delete
        </button>
      </div>
    </>
  );
}
