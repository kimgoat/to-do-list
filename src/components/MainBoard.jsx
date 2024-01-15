import styles from "./MainBoard.module.css";
import { Resizable } from "re-resizable";
import Header from "./Header";
import List from "./List";
import { useState, useEffect } from "react";
import { DarkModeProvider } from "../context/DarkModeContext";

export default function MainBoard() {
  const [itemFilter, setItemFilter] = useState("All");
  const [backgroundImg, setBackgroundImg] = useState(null);

  useEffect(() => {
    const localData = localStorage.getItem("background-img");
    if (localData) {
      setBackgroundImg(JSON.parse(localData));
    }
  }, []);

  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    setBackgroundImg(imgUrl);
    localStorage.setItem("background-img", JSON.stringify(imgUrl));
  };

  const handleFilter = (state) => {
    setItemFilter(state);
  };

  return (
    <DarkModeProvider>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        <input
          type="file"
          accept="image/*"
          required
          multiple
          onChange={handleChangeImg}
        />
        <Resizable
          defaultSize={{ width: 700, height: 600 }}
          minHeight={600}
          maxHeight={600}
          minWidth={400}
          maxWidth={900}
          className={styles.resizable_container}
        >
          <Header handleFilter={handleFilter} />
          <List itemFilter={itemFilter} />
        </Resizable>
      </div>
    </DarkModeProvider>
  );
}
