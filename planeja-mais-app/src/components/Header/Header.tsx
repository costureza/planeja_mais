import React from "react";
import styles from "./style.module.scss";

export const Header: React.FC = ()=>{
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>planeja <span>+</span></h1>
      </div>

    </header>

  );
};