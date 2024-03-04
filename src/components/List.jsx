import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";
import ListItem from "./ListItem";

export default function List({ itemFilter }) {
  const [list, updateList] = useImmer(initalList);

  const [input, setIntput] = useState("");
  const [refresh, setRefresh] = useState(1);

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
  }, [refresh]);

  const handleAdd = (e) => {
    const key = e.target.id;
    const title = e.target.value;
    const checked = false;
    const start_date = dateString;
    const end_date = undefined;
    const deadline = undefined;
    const completed_date = undefined;

    updateList((list) => {
      list.todos.push({
        key,
        title,
        checked,
        start_date,
        end_date,
        deadline,
        completed_date,
      });
      localStorage.setItem("list", JSON.stringify(list));
    });
    setRefresh((refresh) => refresh * -1);
  };

  const handleDelete = (key) => {
    // updateList((list) => {
    //   const index = list.todos.findIndex((todo) => todo.key === key);
    //   list.todos.splice(index, 1);
    //   localStorage.setItem("list", JSON.stringify(list));
    // });

    const index = list.todos.findIndex((todo) => todo.key === key);
    list.todos.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(list));
  };

  const handleState = (key, checked) => {
    setRefresh((refresh) => refresh * -1);

    updateList((list) => {
      const todo = list.todos.find(
        (todo) => todo.checked === checked && todo.key === key
      );
      todo.checked = !checked;
      localStorage.setItem("list", JSON.stringify(list));
    });
  };

  const handleUpdate = (key, deadline) => {
    updateList((list) => {
      const todo = list.todos.find((todo) => todo.key === key);
      todo.deadline = deadline;
      localStorage.setItem("list", JSON.stringify(list));
    });
  };

  const handleCompleted = (key, completed_date) => {
    updateList((list) => {
      const todo = list.todos.find((todo) => todo.key === key);
      todo.completed_date = completed_date;
      localStorage.setItem("list", JSON.stringify(list));
    });
  };

  const handleEditChange = (key, changeTitle) => {
    updateList((list) => {
      const todo = list.todos.find((todo) => todo.key === key);
      todo.title = changeTitle;
      localStorage.setItem("list", JSON.stringify(list));
    });
  };

  function enterkeyEvent(e) {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      if (e.target.value.trim().length === 0) {
        return;
      }
      setIntput("");
      handleAdd(e);
    }
  }

  const textHandler = (e) => {
    const inputText = e.target.value;
    setIntput(inputText);
  };

  return (
    list && (
      <>
        <div className={styles.container}>
          {itemFilter === "All" && (
            <div className={styles.list_container}>
              {list.todos.map((todo, index) => {
                return (
                  todo.title != null && (
                    <ListItem
                      handleDelete={handleDelete}
                      handleState={handleState}
                      handleUpdate={handleUpdate}
                      handleCompleted={handleCompleted}
                      handleEditChange={handleEditChange}
                      key={index}
                      index={index}
                      todo={todo}
                    />
                  )
                );
              })}
            </div>
          )}
          {itemFilter === "Active" && (
            <div className={styles.list_container}>
              {list.todos.map((todo, index) => {
                return (
                  todo.title != null &&
                  !todo.checked && (
                    <ListItem
                      handleDelete={handleDelete}
                      handleState={handleState}
                      handleUpdate={handleUpdate}
                      handleCompleted={handleCompleted}
                      handleEditChange={handleEditChange}
                      key={index}
                      index={index}
                      todo={todo}
                    />
                  )
                );
              })}
            </div>
          )}
          {itemFilter === "Completed" && (
            <div className={styles.list_container}>
              {list.todos.map((todo, index) => {
                return (
                  todo.title != null &&
                  todo.checked && (
                    <ListItem
                      handleDelete={handleDelete}
                      handleState={handleState}
                      handleUpdate={handleUpdate}
                      handleCompleted={handleCompleted}
                      handleEditChange={handleEditChange}
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
    )
  );
}

function getFilterItems(list, itemFilter) {
  if (itemFilter === "All") {
    return list;
  } else if (itemFilter === "Active") {
    return list.todos.filter((todo) => todo.checked === false);
  } else if (itemFilter === "Completed") {
    return list.todos.filter((todo) => todo.checked === true);
  }
}

const initalList = {
  todos: [
    {
      //   title: null,
      //   checked: null,
      //   start_date: null,
      //   end_date: null,
      //   deadline: null,
      // completed_date = null
    },
  ],
};
