import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../../actions";
import styles from "../SearchBar/SearchBar.module.css";


export default function SearchBar(){
    const dispatch = useDispatch()
    const [name,setName] = useState("")

function handleInputChange(event){
    event.preventDefault()
     setName(event.target.value)
}

function handleSubmit(event){
    event.preventDefault()
    if(name.length !== 0 ){
        dispatch(getNameDogs(name)) 
    }
    
}

    return(
        <div>
            <input
            className={styles.search}
            
            type = "text"
            placeholder = "Find a breed here..."
            onChange = {(event) => handleInputChange(event)}/>
            <button  className={styles.btn2}type="submit" onClick={(event) => handleSubmit(event)}>
                Search!
            </button>
        </div>
    )
}