import React from "react";
import styles from "../Card/Card.module.css";

export default function Card(props){
    return(
        <div className={styles.container}>
         <div className={styles.card}>
             <div className={styles.imgBx}>
               <img className={styles.img}src={props.image} alt="📸 not found"/>
             </div>
             <div className={styles.contentBx}>
               <div className={styles.content}>
                  <h1>{props.name}</h1>
                  <h2>Weight:{props.weight} kg</h2>
                  <h3>Temperaments: {props.createdInDb
                          ? props.temperaments.map((el) => el.name).join(", ")
                          : props.temperament}</h3>
               </div>
             </div>
         </div>
        </div>
    )
}
