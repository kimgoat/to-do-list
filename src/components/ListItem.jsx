import React, { useState } from "react";
import styles from "./ListItem.module.css";

export default function ListItem({ handleDelete, todo, index }) {
  const [title, setTitle] = useState(todo.title);

  return (
    <>
      <div className={styles.container}>
        <p>{todo.title}</p>
        <button
          key={index}
          onClick={() => {
            setTitle(title);
            handleDelete(title);
          }}
        >
          delete
        </button>
      </div>
    </>
  );
}
