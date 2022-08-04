import React from "react";
import {Link} from "react-router-dom";
import styles from "../LandingPage/LandingPage.module.css";

export default function landingPage(){
    return(
        <div>
            <div>
             <h1 className={styles.title}>Welcome to Pawradise</h1>
            <Link to ="/home">
                <button className={styles.btn}> Home </button>
            </Link>
            </div>
        </div>
    )
}
    
