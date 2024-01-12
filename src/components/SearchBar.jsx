import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { useImmer } from "use-immer";

export default function SearchBar() {
  const [list, updateList] = useImmer(initalList);
  const [text, setText] = useState("");

  const handleAdd = (e) => {
    const title = e.target.value;
    const status = "Active";

    updateList((list) => {
      list.todos.push({ title, status });
    });
    // console.log(list.todos);
  };

  function enterkeyEvent(e) {
    if (window.event.keyCode == 13) {
      handleAdd(e);
      setText("");
    }
  }

  const textHandler = (e) => {
    const inputText = e.target.value;
    setText(inputText);
  };

  return (
    <>
      {list.todos.map((todo, index) => (
        <p key={index}>{todo.title}</p>
      ))}
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          id="todo"
          name="todo"
          placeholder="input"
          onChange={textHandler}
          value={text}
          onKeyUp={(e) => {
            enterkeyEvent(e);
          }}
        />
      </div>
    </>
  );
}

const initalList = {
  todos: [
    {
      title: null,
      status: null,
    },
  ],
};
