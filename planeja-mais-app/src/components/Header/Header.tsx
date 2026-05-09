import React from "react";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircleUser } from '@fortawesome/free-regular-svg-icons'; 

export const Header: React.FC = () => {
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
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faCircleUser} /> 
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faBell} />
              </a>
            </li>
          </ul>
        </nav>  
      </div>
    </header>
  );
};