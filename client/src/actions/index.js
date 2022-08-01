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
export function postDog(payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/dogs",payload)
        console.log(response)
        return response;
    }
}
export function filterByApiordb(payload){
    return{
        type: "FILTER_BY_APIORDB",
        payload
    }
}
export function filterByTemper(payload){
    return{
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



