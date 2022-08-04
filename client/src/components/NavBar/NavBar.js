import React from "react";
import { Link } from "react-router-dom";
import styles from "../NavBar/NavBar.module.css";

export default function NavBar(){

    return (
      <div className={styles.NavBar}>

        <div className={styles.landing}>
          <div className={styles.logo}></div>
          <Link 
            style={{fontFamily:"gillSans", color:"aqua", paddingLeft:"15px"}} to="/">
              Pawradise
          </Link>
        </div>

          <div className={styles.nav}>
            <div className={styles.home}>
              <Link 
                style={{fontFamily:"gillSans", color:"aqua"}} to="/home">
                  Home
              </Link>
            </div>

            <div  className={styles.breed}>
              <Link 
                style={{fontFamily:"gillSans", color:"aqua"}} to="/dog">
                  Create New Breed
              </Link>
            </div>
          </div>
      </div>
    );
};