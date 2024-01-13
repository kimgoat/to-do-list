import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import { useImmer } from "use-immer";
import ListItem from "./ListItem";

export default function List() {
  const [list, updateList] = useImmer(initalList);
  const [input, setIntput] = useState("");
  const [toDo, setToDo] = useState("");

  var today = new Date();
  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);
  var dateString = year + "-" + month + "-" + day;

  useEffect(() => {
    const localData = localStorage.getItem("list");
    if (localData) {
      updateList(JSON.parse(localData));
    }
  }, []);

  const handleAdd = (e) => {
    const title = e.target.value;
    const status = true;
    const start_date = dateString;
    const end_date = undefined;
    const deadline = undefined;

    updateList((list) => {
      list.todos.push({ title, status, start_date, end_date, deadline });
      localStorage.setItem("list", JSON.stringify(list));
    });
  };

  function enterkeyEvent(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      setIntput("");
      handleAdd(e);
    }
  }

  const textHandler = (e) => {
    const inputText = e.target.value;
    setIntput(inputText);
  };

  return (
    <div className={styles.container}>
      <div className={styles.list_container}>
        {list.todos.map((todo, index) => {
          return todo.title != null && <ListItem index={index} todo={todo} />;
        })}
      </div>
      <div className={styles.input_container}>
        <input
          className={styles.input}
          type="text"
          id="todo"
          name="todo"
          placeholder="input"
          onChange={textHandler}
          value={input}
          onKeyPress={(e) => {
            enterkeyEvent(e);
          }}
        />
      </div>
    </div>
  );
}

const initalList = {
  todos: [
    {
      title: null,
      status: null,
      start_date: null,
      end_date: null,
      deadline: null,
    },
  ],
};
