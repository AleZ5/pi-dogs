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



