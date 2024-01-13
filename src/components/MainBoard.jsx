import React, { useState } from "react";
import styles from "./MainBoard.module.css";
import { useImmer } from "use-immer";
import { Resizable } from "re-resizable";
import Header from "./Header";
import List from "./List";
import SearchBar from "./SearchBar";
import TimeTimer from "./TimeTimer";

export default function MainBoard() {
  //   const [list, updateList] = useImmer(initalList);

  //   const handleAdd = (todos) => {
  //     const title = e.target.value;
  //     const status = "Active";

  //     updateList((list) => {
  //       list.todos.push({ title, status });
  //     });
  //     // console.log(list.todos);
  //   };

  return (
    <>
      {/* <TimeTimer /> */}
      <div className={styles.container}>
        <Resizable
          defaultSize={{ width: 500, height: 600 }}
          minHeight={300}
          minWidth={300}
          className={styles.test}
        >
          <Header />
          <List />
          {/* <SearchBar /> */}
        </Resizable>
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
