import styles from "./MainBoard.module.css";
import Header from "./Header";
import List from "./List";
import Modal from "./Modal";
import { useState, useEffect, useContext } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { DarkModeContext } from "../context/DarkModeContext";

//icons
import { FaRegFileImage } from "react-icons/fa";

export default function MainBoard() {
  const [itemFilter, setItemFilter] = useState("All");
  const [backgroundImg, setBackgroundImg] = useState(null);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const settings = [
    { id: 1, title: "배경 이미지 설정하기" },
    { id: 2, title: "다크모드" },
    // { id: 3, title: "언어 변경하기" },
    // { id: 4, title: "글자 크기 변경하기" },
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
    <>
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
                {settings.map((settings, index) => {
                  switch (settings.id) {
                    case 1:
                      return (
                        <>
                          <li key={index} id={settings.id}>
                            {settings.title}
                          </li>
                          <label
                            className={styles.background_label}
                            htmlFor="input_img"
                          >
                            <FaRegFileImage />
                          </label>
                          <input
                            id="input_img"
                            className={styles.background_input}
                            type="file"
                            accept="image/*"
                            required
                            multiple
                            onChange={handleChangeImg}
                            style={{ display: "none" }}
                          />
                        </>
                      );
                    case 2:
                      return (
                        <>
                          <li key={index} id={settings.id}>
                            {settings.title}
                          </li>
                          {darkMode ? (
                            <button onClick={() => toggleDarkMode()}>
                              끄기
                            </button>
                          ) : (
                            <button onClick={() => toggleDarkMode()}>
                              켜기
                            </button>
                          )}
                        </>
                      );
                    case 3:
                      return (
                        <>
                          <li key={index} id={settings.id}>
                            {settings.title}
                          </li>
                          <select>
                            <option>Korea</option>
                            <option>English</option>
                            <option>Japan</option>
                          </select>
                        </>
                      );
                    case 4:
                      return (
                        <>
                          <li key={index} id={settings.id}>
                            {settings.title}
                          </li>
                          10
                          <input type="range" min={10} max={30} />
                          30
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
    </>
  );
}
