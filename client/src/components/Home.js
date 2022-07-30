import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs } from "../actions";
import {Link} from "react-router-dom";
import Card from "./Card";
import styles from "./Home.module.css";
import Paginado from "./Paginado";

export default function Home(){

    const dispatch = useDispatch()
    const allDogs = useSelector ((state) => state.dogs)
    const [currentPage,setCurrentPage] = useState(1)
    const [dogsPerPage,setDogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog,indexOfLastDog)
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getDogs());
    },[dispatch])

    function handleCLick(event){
        event.preventDefault();
        dispatch(getDogs());
    }

    return (
        <div>
            <Link to= "/dog">Create Dog</Link>
            <h1>WELCOME TO DOGS</h1>
            <button onClick={event=>{handleCLick(event)}}>
                Reload all dogs 
            </button>
            <div>
                <select>
                    <option value= "asc">Ascending Order</option>
                    <option value= "desc">Descending Order</option>
                </select>
                <select>
                    <option value= "all">All Dogs</option>
                    <option value= "created">Created Dogs</option>
                    <option value= "api">Existing Dogs</option>
                </select>
                <select>
                    <option value= "temp">By Temperament</option>
                </select>
                <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.lenth}
                paginado={paginado}
                />
                {currentDogs?.map((c) => {
                    return (
                        <div className={styles.cardArea}>
                          <Link to={"/home/" + c.id}>
                          <Card name={c.name} image={c.image} temperament={c.temperament} weight={c.weight} key={c.id}/>
                          </Link>
                        </div>
                    );
               })}
            </div>
        </div>
    )
}