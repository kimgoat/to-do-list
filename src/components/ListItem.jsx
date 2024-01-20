import React, { useState, useEffect } from "react";
import styles from "./ListItem.module.css";
import Modal from "./Modal";

// icons
import { IoTrash } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import { FaInfo } from "react-icons/fa6";

export default function ListItem({
  handleDelete,
  handleState,
  handleUpdate,
  handleCompleted,
  handleEditChange,
  todo,
  index,
}) {
  const [checked, setChecked] = useState(todo.checked);
  const [deadline, setDeadline] = useState(todo.deadline);
  const [dDay, setDDay] = useState(0);
  const [title, setTitle] = useState(todo.title);
  const [completedDay, setCompletedDay] = useState(todo.completed_date);
  const [deleted, setDeleted] = useState(false);
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
    !deleted && (
      <>
        <div className={styles.container}>
          {/* 투두리스트 체크박스 */}
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              handleState(key, checked);
              setCompletedDay(minDay);
              handleCompleted(key, completedDay);
            }}
          />
          {/* 투두리스트 등록 날짜와 마감날짜 공지 */}
          <div className={styles.info_container}>
            <div className={styles.info_icon}>
              <FaInfo size={17} />
            </div>
            <div className={styles.info_list}>
              <p>시작: {todo.start_date}</p>
              {deadline != undefined && <p>목표: {todo.deadline}</p>}
              {completedDay != undefined && todo.checked && (
                <p>완료: {completedDay}</p>
              )}
            </div>
          </div>

          {/* 투두리스트 등록 내용 */}
          <div className={styles.content}>
            {!checked && (
              <Modal title={"edit"}>
                <textarea
                  className={styles.todo_title}
                  value={title}
                  type="text"
                  onChange={(e) => {
                    setTitle(e.target.value);
                    handleEditChange(key, e.target.value);
                  }}
                />
                {/* 투두리스트 마감날짜 설정  */}
                {!checked && (
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
                )}
              </Modal>
            )}
            <label className={styles.todo_label}>{title}</label>
          </div>

          {/* 투두리스트 마감날짜 설정  */}
          {/* {!checked && (
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
          )} */}

          {/* 디데이 */}
          {!checked && (
            <>
              {!isNaN(dDay) && (
                <div className={styles.dDay_counter_container}>
                  {dDay === 0
                    ? `${"TODAY"}`
                    : dDay < 0
                    ? `${"D + " + `${-dDay}`}`
                    : `${"D - " + `${dDay}`}`}
                </div>
              )}
            </>
          )}

          {/* 삭제 버튼 */}
          <button
            key={index}
            onClick={() => {
              handleDelete(key);
              setDeleted(true);
            }}
          >
            <IoTrash />
          </button>
        </div>
      </>
    )
  );
}
