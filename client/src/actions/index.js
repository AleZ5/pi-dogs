import axios from "axios";

export function getDogs(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/dogs", {
        });
        return dispatch({
            type: "GET_DOGS",
            payload: json.data
        })
    }
}
export function getNameDogs(name){
    return async function (dispatch){
        try{
           var json = await axios.get ("http://localhost:3001/dogs?name=" + name);
           return dispatch({
               type: "GET_NAME_DOGS",
               payload: json.data
           })
        } catch (error){
            console.log(error)
        }
    }
}
export function getTemperaments(payload){
    return async function (dispatch){
        var info = await axios.get("http://localhost:3001/temperaments",{
        });
        return dispatch({type: "GET_TEMPERAMENTS", payload: info.data})
    }
} 
/* export function getTemperaments(){
    return function(dispatch){
        return fetch("http://localhost:3001/temperaments")
        .then(res => res.json())
        .then(json => dispatch({
            type:"GET_TEMPERAMENTS",
            payload: json
        }))
    }
} */
export function postDog(payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/dogs",payload)
        return response;
    }
}
export function getDogById(id){
    return function(dispatch){
        axios(`http://localhost:3001/dogs/${id}`)
        /* .then(res => res.json()) */
        .then(json => dispatch({
            type:"GET_DOG_BY_ID",
            payload: json.data[0] 
        }))
    }
}

/* export function getDogById(id){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/dogs/" + id);
            return dispatch({
                type: "GET_DOG_BY_ID",
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}*/
export function resetDetail(){
    return{
        type: "RESET_DETAIL"
    }
}
export function filterByApiordb(payload){
    return{
        type: "FILTER_BY_APIORDB",
        payload
    }
}
export function filterByTemper(payload){
    return {
        type: "FILTER_BY_TEMPER",
        payload
    }
}

 export function orderByWeight(payload){
    return{
        type: "ORDER_BY_WEIGHT",
        payload 
    }
}

export function orderByAtoZ(payload){
    return{
        type: "ORDER_BY_ATOZ",
        payload
    }
} 
/* export function order(payload){
    return{
        type: "ORDER",
        payload
    }
} */


