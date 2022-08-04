import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs, getTemperaments, filterByTemper, filterByApiordb, order /* orderByAtoZ, orderByWeight */} from "../../actions";
import {Link} from "react-router-dom";
import Card from "../Card/Card";
import styles from "./Home.module.css";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";



export default function Home(){

    const dispatch = useDispatch()
    const allDogs = useSelector ((state) => state.dogs)
    const temperaments = useSelector((state) => state.temperaments)
    const [order, setOrder]= useState("")
    const [currentPage,setCurrentPage] = useState(1)
    const [dogsPerPage,setDogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs?.slice(indexOfFirstDog,indexOfLastDog)
    const length = allDogs?.length;
    const orderFilter = useSelector((state)=> state.orderFilter)
    let actualOrderFilter = useSelector((state)=> state.orderFilter)
    


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getDogs());
        dispatch(getTemperaments());
    },[dispatch])

    function handleCLick(event){
        event.preventDefault();
        dispatch(getDogs());
    }

    function handleFilterByTemper(event){
        dispatch(filterByTemper(event.target.value))
        setCurrentPage(1);
        setOrder(event.target.value)
        
    }

    function handleFilterByApiordb(event){
        dispatch(filterByApiordb(event.target.value))
        setCurrentPage(1);
        setOrder(event.target.value)
        
    }
    function orders(e){
        e.preventDefault();
        dispatch(order(e.target.value));
        setCurrentPage(1)
        
    }

    /* function handleSort(event){
        event.preventDefault();
        dispatch(orderByAtoZ(event.target.value))
        setCurrentPage(1);
        setOrder(event.target.value)
    }
    function handleOrderByWeight(event){
        dispatch(orderByWeight(event.target.value))
        setCurrentPage(1);
        setOrder(event.target.value)
    } */

    return (
        <div className={styles}>
            <NavBar/>
            {/* <Link to= "/dog">Create Dog</Link> */}
            <div className={styles.title2}>
            <h1>Welcome to Pawradise</h1>
            </div>
            <button className={styles.btn3}onClick={event=>{handleCLick(event)}}>
                Reload all dogs 
            </button>
            <div>
                {/* <select onClick={event => handleSort(event)}>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                </select> */}
                <label className={styles.lbl}>Filter By:</label>
                <select className={styles.select} onChange={event => handleFilterByApiordb(event)}>
                    <option value="all">All Dogs</option>
                    <option value="created">Created Dogs</option>
                    <option value="api">Existing Dogs</option>
                </select>
                <label className={styles.lbl}>Filter By:</label>
                <select className={styles.select} onChange={event => handleFilterByTemper(event)}>
                    <option value="" disabled >
                        Pick one...
                    </option>
                    <option value="all">By Temperament</option>
                    {temperaments.map((event) => (
                        <option value={event.name}>{event.name}</option>
                    ))}
                </select>  
                <div>
                    <label className={styles.lbl}>Order by:</label>
                    <select className={styles.select} defaultValue="asc" onChange={(e)=> orders(e)}>
                    <option value="" disabled >
                        Pick one...
                    </option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                    <option value="min"> Lightest - Heaviest</option>
                    <option value="max"> Heaviest - Lightest </option>
                    </select>
                </div>
                {/* <div>
                <label className={styles.label}>Order by:</label>
                <select onChange={(event) => handleOrderByWeight(event)} className={styles.select}>
                    <option value="" disabled >
                        Pick one...
                    </option>
                    <option value="min"> Lightest - Heaviest</option>
                    <option value="max"> Heaviest - Lightest </option>
                </select>
                <select onClick={event => handleSort(event)}>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                </select>
                </div> */}
                <Paginado
                value={currentPage}
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />
                <SearchBar/>
                <div className={styles.cardArea}>
                {currentDogs?.map((c) => {
                    return (
                          <Link key={c.id} to={'/dogs/' + c.id}> 
                          <Card name={c.name} image={c.image} temperaments={c.temperaments} temperament={c.temperament} weight={c.weight} key={c.id}/>
                          </Link>   
                    );
               })}
               </div>
            </div>
        </div>
    )
}