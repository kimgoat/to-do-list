import styles from "./MainBoard.module.css";
import Header from "./Header";
import List from "./List";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { DarkModeProvider } from "../context/DarkModeContext";

export default function MainBoard() {
  const [itemFilter, setItemFilter] = useState("All");
  const [backgroundImg, setBackgroundImg] = useState(null);
  const listPosition = useSpring({ x: 0, y: 0 });

  useEffect(() => {
    const localBackgroundImgData = localStorage.getItem("background-img");
    if (localBackgroundImgData) {
      setBackgroundImg(JSON.parse(localBackgroundImgData));
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

  const bindListPosition = useDrag((params) => {
    listPosition.x.set(params.offset[0]);
    listPosition.y.set(params.offset[1]);
    localStorage.setItem(
      "position",
      JSON.stringify({ x: listPosition.x, y: listPosition.y })
    );
  });

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

        {/* <animated.div
          {...bindListPosition()}
          className={styles.to_do_list_container}
          style={{ x: listPosition.x, y: listPosition.y }}
        > */}
        <div>
          <Header handleFilter={handleFilter} />
          <List itemFilter={itemFilter} />
        </div>
        {/* </animated.div> */}
      </div>
    </DarkModeProvider>
  );
}
