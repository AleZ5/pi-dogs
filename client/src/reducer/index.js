
const initialState = {
    dogs: [],
    temperaments: [],
    dogsSafe: []
}
function rootReducer (state= initialState, action){
    switch(action.type){
        case "GET_DOGS":
            return{
                ...state,
                dogs: action.payload,
                dogsSafe: action.payload
            }
            case "FILTER_BY_TEMPER":
                const allDogs = state.dogsSafe
                const temperFilter = action.payload === "all" ? allDogs : allDogs.filter(el => el.temperament === action.payload) 
            return {
                ...state,
                temperaments: temperFilter
                }
            case "FILTER_BY_APIORDB":
                const allDogsTwo = state.dogsSafe
                const apiFilter = action.payload === "created"? allDogsTwo.filter(el => el.createdInDb) : allDogsTwo.filter(el => !el.createdInDb)
                return{
                    ...state,
                    dogs: action.payload === "all"? state.dogsSafe : apiFilter
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