import React from "react";
import {Link,useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getDogById, resetDetail } from "../../actions/index";
import { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import styles from "../Detail/Detail.module.css";



export default function Detail(props){
    const {id} = useParams()
    const dispatch = useDispatch()
    const myDog = useSelector((state) => state.detail)
    useEffect(()=> {
        dispatch(resetDetail()) 
        dispatch(getDogById(id))
    }, [dispatch,id] )
    
    return(
        <div className={styles.container}>
         
         <div > 
         <NavBar/>
             <h1 className={styles.title}> {myDog.name} </h1>
             <img className={styles.img} src={myDog.image}/>
             <h5 className={styles.cont}>Height: {myDog.height} cm</h5>
             <h5 className={styles.cont}>Weight: {myDog.weight} kg</h5>
             <h5 className={styles.cont}>Temperaments:</h5>
             <h5 className={styles.cont}>{myDog.createdInDb
                          ? myDog.temperaments.map((el) => el.name).join(", ")
                          : myDog.temperament}</h5> 
             <h5 className={styles.cont}>Life Span: years{myDog.life_span}</h5>
        <Link to='/home'><button className={styles.btn}>Go Home</button> </Link>
         </div> 
          </div>
    )
}