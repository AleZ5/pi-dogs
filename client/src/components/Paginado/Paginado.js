import React from "react";
import styles from "../Paginado/Paginado.module.css";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = []; 

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers?.map((number) => (
          <li key={number} className={styles.list}>
            <button onClick={() => paginado(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
