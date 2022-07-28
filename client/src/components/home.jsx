import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs } from "../actions";
import {Link} from "react-router-dom";

export default function home (){
    const dispatch = useDispatch()
    const allDogs = useSelector ((state) => state.dogs)

    useEffect (()=>{
        dispatch(getDogs());
    },[])

    function handleCLick(event){
        event.preventDefault();
        dispatch(getDogs());
    }

    return (
        <div>
            <Link to= "/dog">Create Dog</Link>
            <h1>DOGS</h1>
            <button onClick={event=>{handleCLick(event)}}>
                Reload all dogs 
            </button>
            <div>
                <select>
                    <option value= "asc">Ascending Order</option>
                    <option value= "desc">Descending Order</option>
                </select>
                <select>
                    <option value= "aToZ"></option>
                    <option></option>
                    <option></option>
                </select>
            </div>
        </div>
    )
}