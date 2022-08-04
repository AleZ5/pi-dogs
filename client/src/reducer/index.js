
const initialState = {
    dogs: [],
    temperaments: [],
    dogsSafe: [],
    detail: [],
    /* orderFilter: {
        order: "all"
    } */
}
function rootReducer (state= initialState, action){
   
    switch(action.type){

        case "GET_DOGS":
            return{
                ...state,
                dogs: action.payload,
                dogsSafe: action.payload
            }
            case "RESET_DETAIL":
             return{
                 ...state,
                 detail: []
             }
            case "GET_NAME_DOGS":
                return{
                    ...state,
                    dogs: action.payload
                }
            case "GET_TEMPERAMENTS":
                return{
                    ...state,
                    temperaments: action.payload
                }
            case "GET_DOG_BY_ID":
                return{
                    ...state,
                    detail: action.payload
                }
            case "FILTER_BY_TEMPER":
                let temp = action.payload
                let dogs2 = []
                dogs2 = [...state.dogsSafe.filter(d => d.temperament && d.temperament.includes(temp)), ...state.dogsSafe.filter(d=> d.temperaments?.map(t => t.name).includes(temp))]
                if(action.payload === "all")
                 state.dogs = state.dogsSafe
                 return{
                     ...state,
                     dogs: dogs2
                 }
             /*    action.payload === "all"? state.dogs= state.dogsSafe.filter(inf => inf.temperaments.lenght):
                state.dogs= state.dogsSafe.filter(temp => temp.temperaments.includes(action.payload))
                return {
                    ...state,
                    dogs: state.dogs
                }
                 */
            /* const allDogs = state.dogsSafe
                const temperFilter = action.payload === "all" ? allDogs : allDogs.filter(el => el.temperament === action.payload) */ 
            
            case "POST_DOG":
                return{
                    ...state
                }
            case "FILTER_BY_APIORDB":
                const allDogsTwo = state.dogsSafe
                const apiFilter = action.payload === "created"? allDogsTwo.filter(el => el.createdInDb) : allDogsTwo.filter(el => !el.createdInDb)
                return{
                    ...state,
                    dogs: action.payload === "all"? state.dogsSafe : apiFilter
                }
            /* case "ORDER":
                let sort =[];
                let order= action.payload;
                if (order == "all")
                    state.dogs = state.dogsSafe
                 return{
                    ...state,
                    state.dogsorderFilter:{
                        ...state.orderFilter,
                        order:"all",
                    } 
                
                if (order =="asc"){
                    sort = state.dogs.sort((a,b)=>{
                        if(a.name.toLowerCase() > b.name.toLowerCase()){
                            return 1;
                        }
                        if(a.name.toLowerCase() < b.name.toLowerCase()){
                            return -1;
                        }
                        return 0;
                    })
                }
                if (order == "dsc"){
                    sort = state.dogs.sort((a,b)=>{
                        if(a.name.toLowerCase() > b.name.toLowerCase()){
                            return -1;
                        }
                        if(a.name.toLowerCase() < b.name.toLowerCase()){
                            return 1;
                        }
                        return 0;
                    })
                }
                if (order == "min"){
                    sort = state.dogs.sort((a,b)=>{
                        return(
                            a.weight.metric.replace(/\s+/g, "").split("-")[1]-
                            b.weight.metric.replace(/\s+/g, "").split("-")[1]
                        )
                    })
                }
                if(order == "max"){
                    sort = state.dogs.sort((a,b)=>
                        b.weight.metric.replace(/\s+/g, "").split("-")[1] -
                        a.weight.metric.replace(/\s+/g, "").split("-")[1]
                    )
                }
                return{
                    ...state,
                    dogs: [...sort],
                    
                } */

            case "ORDER_BY_WEIGHT":
                  action.payload === "min" ?
                  state.dogs.sort(function(a,b){
                      if(a.weight > b.weight) {
                          return 1;
                      }
                      if(b.weight > a.weight) {
                          return -1;
                      }
                      return 0;
                  }) :
                  state.dogs.sort(function (a,b){
                      if(a.weight > b.weight){
                          return -1;
                      }
                      if(b.weight > a.weight){
                          return 1;
                      }
                      return 0;
                  })
                return {
                    ...state,
                    dogs: state.dogs
                }
            case "ORDER_BY_ATOZ":
                let sortedArr = action.payload === "asc" ?
                  state.dogs.sort(function(a,b){
                      if(a.name > b.name) {
                          return 1;
                      }
                      if(b.name > a.name) {
                          return -1;
                      }
                      return 0;
                  }) :
                  state.dogs.sort(function (a,b){
                      if(a.name > b.name){
                          return -1;
                      }
                      if(b.name > a.name){
                          return 1;
                      }
                      return 0;
                  })
                return {
                    ...state,
                    dogs: sortedArr
                } 
            default:
                return state;
    }

}

export default rootReducer;