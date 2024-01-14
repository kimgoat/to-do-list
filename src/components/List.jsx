import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";
import ListItem from "./ListItem";

export default function List({ itemFilter }) {
  const [list, updateList] = useImmer(initalList);
  const [input, setIntput] = useState("");

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
    const key = e.target.id;
    const title = e.target.value;
    const status = false;
    const start_date = dateString;
    const end_date = undefined;
    const deadline = undefined;

    updateList((list) => {
      list.todos.push({ key, title, status, start_date, end_date, deadline });
      localStorage.setItem("list", JSON.stringify(list));
    });
  };

  const handleDelete = (key) => {
    updateList((list) => {
      const index = list.todos.findIndex((todo) => todo.key == key);
      list.todos.splice(index, 1);
      localStorage.setItem("list", JSON.stringify(list));
    });
  };

  const handleState = (key, status) => {
    updateList((list) => {
      const todo = list.todos.find(
        (todo) => todo.status === status && todo.key === key
      );
      todo.status = !status;
      localStorage.setItem("list", JSON.stringify(list));
    });
  };

  const handleUpdate = (key, deadline) => {
    const current = deadline;

    updateList((list) => {
      const todo = list.todos.find((todo) => todo.key === key);
      todo.deadline = current;
      localStorage.setItem("list", JSON.stringify(list));
    });
  };

  function enterkeyEvent(e) {
    if (e.key == "Enter" && e.nativeEvent.isComposing == false) {
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
    <>
      <div className={styles.container}>
        {itemFilter == "All" && (
          <div className={styles.list_container}>
            {list.todos.map((todo, index) => {
              return (
                todo.title != null && (
                  <ListItem
                    handleDelete={handleDelete}
                    handleState={handleState}
                    handleUpdate={handleUpdate}
                    key={index}
                    index={index}
                    todo={todo}
                  />
                )
              );
            })}
          </div>
        )}
        {itemFilter == "Active" && (
          <div className={styles.list_container}>
            {list.todos.map((todo, index) => {
              return (
                todo.title != null &&
                todo.status == false && (
                  <ListItem
                    handleDelete={handleDelete}
                    handleState={handleState}
                    handleUpdate={handleUpdate}
                    key={index}
                    index={index}
                    todo={todo}
                  />
                )
              );
            })}
          </div>
        )}
        {itemFilter == "Completed" && (
          <div className={styles.list_container}>
            {list.todos.map((todo, index) => {
              return (
                todo.title != null &&
                todo.status == true && (
                  <ListItem
                    handleDelete={handleDelete}
                    handleState={handleState}
                    handleUpdate={handleUpdate}
                    key={index}
                    index={index}
                    todo={todo}
                  />
                )
              );
            })}
          </div>
        )}

        {/* 투두리스트 입력란 */}
        <div className={styles.input_container}>
          <input
            className={styles.input}
            type="text"
            id={uuidv4()}
            name="todo"
            placeholder="input"
            onChange={textHandler}
            value={input}
            onKeyDown={(e) => {
              enterkeyEvent(e);
            }}
          />
        </div>
      </div>
    </>
  );
}

const initalList = {
  todos: [
    {
      //   title: null,
      //   status: null,
      //   start_date: null,
      //   end_date: null,
      //   deadline: null,
    },
  ],
};
