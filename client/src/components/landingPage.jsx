import React from "react";
import {Link} from "react-router-dom";

export default function landingPage(){
    return(
        <div>
            <h1>Welcome</h1>
            <Link to ="/home">
                <button> Home </button>
            </Link>
        </div>
    )
}
    
