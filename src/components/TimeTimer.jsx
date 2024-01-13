import React, { useEffect, useRef, useState } from "react";
import styles from "./TimeTimer.module.css";

export default function TimeTimer() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const timerRef = useRef();

  const [controlButtonPosition, setControlButtonPosition] = useState({});

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.timer}
          onPointerMove={(e) => setPosition((prev) => ({ x: e.x, y: prev.y }))}
        >
          <div className={styles.timer_control_button}>
            <div
              ref={timerRef}
              className={styles.timer_control_arrow}
              onClick={(e) => console.log(e.clientX, e.clientY)}
              onDragEnd={(e) => console.log(e.clientX, e.clientY)}
              style={{
                transform: `rotate(${10}deg)`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
