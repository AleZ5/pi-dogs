import React from "react";
import { useState } from "react";
import styles from "../Paginado/Paginado.module.css";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = []; 
  const [pageNum , setPageNum] = useState(1)
    for(let i = 0; i < Math.ceil(allDogs/dogsPerPage); i++){
     pageNumbers.push(i+1)
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
