import React from "react";
import styles from "./style.module.scss";

export const Header: React.FC = ()=>{
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#">
          <h1>planeja <span>+</span></h1>
        </a>
        <nav>
          <ul>
            <li><a href="#">Meus Gastos</a></li>
            <li><a href="#">Agenda Financeira</a></li>
            <li><a href="#">Planejamento</a></li>
          </ul>
        </nav>  
        
        
      </div>

    </header>

  );
};