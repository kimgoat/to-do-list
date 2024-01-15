import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ itemsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav>
        <div className={styles.container}>
          {pageNumbers.map((number) => (
            <div
              key={number}
              className={styles.page_item}
              onClick={() => {
                paginate(number);
              }}
            >
              {number}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Pagination;
