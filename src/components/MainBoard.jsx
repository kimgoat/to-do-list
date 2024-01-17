import styles from "./MainBoard.module.css";
import Header from "./Header";
import List from "./List";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { DarkModeProvider } from "../context/DarkModeContext";

export default function MainBoard() {
  const [itemFilter, setItemFilter] = useState("All");
  const [backgroundImg, setBackgroundImg] = useState(null);
  const settings = [
    { id: 1, title: "배경 이미지 설정하기" },
    { id: 2, title: "다크모드" },
  ];

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
        {/* <animated.div
          {...bindListPosition()}
          className={styles.to_do_list_container}
          style={{ x: listPosition.x, y: listPosition.y }}
        > */}
        <div className={styles.to_do_list_container}>
          <Header handleFilter={handleFilter}>
            <Modal title={"설정"}>
              <ul>
                {settings.map((settings) => {
                  switch (settings.id) {
                    case 1:
                      return (
                        <>
                          <li id={settings.id}>{settings.title}</li>
                          <label
                            className={styles.background_label}
                            for="input_img"
                          >
                            파일 아이콘
                          </label>
                          <input
                            id="input_img"
                            className={styles.background_input}
                            type="file"
                            accept="image/*"
                            required
                            multiple
                            onChange={handleChangeImg}
                          />
                        </>
                      );
                    case 2:
                      return (
                        <>
                          <li id={settings.id}>{settings.title}</li>
                          <button>darkmode</button>
                        </>
                      );
                  }
                })}
              </ul>
            </Modal>
          </Header>
          <List itemFilter={itemFilter} />
        </div>
        {/* </animated.div> */}
      </div>
    </DarkModeProvider>
  );
}
