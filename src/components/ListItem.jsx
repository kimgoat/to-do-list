import React, { useState, useEffect } from "react";
import styles from "./ListItem.module.css";

export default function ListItem({
  handleDelete,
  handleState,
  handleUpdate,
  todo,
  index,
}) {
  const [state, setState] = useState(todo.status);
  const [deadline, setDeadline] = useState(todo.deadline);
  const [dDay, setDDay] = useState(0);
  const key = todo.key;

  var now_utc = Date.now();
  var timeOff = new Date().getTimezoneOffset() * 60000;
  var minDay = new Date(now_utc - timeOff).toISOString().split("T")[0];

  useEffect(() => {
    const today = new Date();
    const dday = new Date(`${deadline} 00:00:00`);
    const getNum = dday - today;
    setDDay(Math.ceil(getNum / (1000 * 60 * 60 * 24)));
  }, [deadline]);

  return (
    <>
      <div className={styles.container}>
        {/* 투두리스트 체크박스 */}
        <input
          type="checkbox"
          checked={state}
          onChange={() => {
            setState(!state);
            handleState(key, state);
          }}
        />
        {/* 투두리스트 등록 날짜와 마감날짜 공지 */}
        <div className={styles.info_container}>
          <div className={styles.info_icon}>i</div>
          <div className={styles.info_list}>
            시작: {todo.start_date}
            <br />
            종료: {todo.deadline}
          </div>
        </div>
        <div className={styles.content}>
          {/* 투두리스트 등록 내용 */}
          <p>{todo.title}</p>
        </div>

        {/* 투두리스트 마감날짜 설정  */}
        <div className={styles.deadline_container}>
          <input
            className={styles.deadline_input}
            type="date"
            min={minDay}
            defaultValue={deadline}
            onChange={(e) => {
              setDeadline(e.target.value);
              handleUpdate(key, e.target.value);
            }}
          />
        </div>

        {/* 디데이 */}
        {!isNaN(dDay) && (
          <div className={styles.dDay_counter_container}>
            D{dDay < 0 ? `${"+"}` : `${" "}`}
            {-dDay}
          </div>
        )}

        {/* 삭제 버튼 */}
        <button
          key={index}
          onClick={() => {
            handleDelete(key);
          }}
        >
          delete
        </button>
      </div>
    </>
  );
}
