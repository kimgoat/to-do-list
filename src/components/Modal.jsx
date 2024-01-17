import React, { useState } from "react";
import ReactModal from "react-modal";
import styles from "./Modal.module.css";

export default function Modal({ title, children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const myModalStyles = (ReactModal.styles = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "360px",
      height: "180px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto",
    },
  });

  return (
    <div className={styles.container}>
      <button onClick={openModal}>{title}</button>
      <ReactModal
        style={myModalStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <div className={styles.modal_content}>{children}</div>
      </ReactModal>
    </div>
  );
}
