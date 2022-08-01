import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs, filterByTemper, filterByApiordb, orderByAtoZ, orderByWeight} from "../../actions";
import {Link} from "react-router-dom";
import Card from "../Card/Card";
import styles from "./Home.module.css";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";


export default function Home(){

    const dispatch = useDispatch()
    const allDogs = useSelector ((state) => state.dogs)
    const [order, setOrder]= useState("")
    const [currentPage,setCurrentPage] = useState(1)
    const [dogsPerPage,setDogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs?.slice(indexOfFirstDog,indexOfLastDog)
    const length = allDogs?.length;
    const temperaments = useSelector((state) => state.temperaments)


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

    function handleFilterByTemper(event){
        dispatch(filterByTemper(event.target.value))
        setCurrentPage(1);
    }

    function handleFilterByApiordb(event){
        dispatch(filterByApiordb(event.target.value))
    }

    function handleSort(event){
        event.preventDefault();
        dispatch(orderByAtoZ(event.target.value))
        setCurrentPage(1);
        setOrder(`Order ${event.target.value}`)
    }

    return (
        <div>
            <Link to= "/dog">Create Dog</Link>
            <h1>Welcome to Pawradise</h1>
            <button onClick={event=>{handleCLick(event)}}>
                Reload all dogs 
            </button>
            <div>
                <select onClick={event => handleSort(event)}>
                    <option value= "asc">A - Z</option>
                    <option value= "desc">Z - A</option>
                </select>
                <select onChange={event => handleFilterByApiordb(event)}>
                    <option value= "all">All Dogs</option>
                    <option value= "created">Created Dogs</option>
                    <option value= "api">Existing Dogs</option>
                </select>
                <select onChange={event => handleFilterByTemper(event)}>
                    <option value= "all">By Temperament</option>
                </select>
                <Paginado
                value={currentPage}
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />
                <SearchBar/>
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