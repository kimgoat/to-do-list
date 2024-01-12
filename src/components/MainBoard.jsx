import React, { useState } from "react";
import styles from "./MainBoard.module.css";
import { useImmer } from "use-immer";
import { Resizable } from "re-resizable";
import Header from "./Header";
import List from "./List";
import SearchBar from "./SearchBar";

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
    <div className={styles.container}>
      <Resizable
        className={styles.testbox}
        defaultSize={{ width: 500, height: 600 }}
      >
        <Header />
        <List />
        <SearchBar on />
      </Resizable>
    </div>
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
