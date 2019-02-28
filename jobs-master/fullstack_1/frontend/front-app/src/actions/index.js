import axios from 'axios'
export const GET_OBJECTIVES = "GET_OBJECTIVES"
export const ERROR_GET_OBJECTIVES = "ERROR_GET_OBJECTIVES"

export function fetchObjectives(){
    return function (dispatch) {
       axios(`http://localhost:8080/src/data.json`).then(function(response){
            console.log(response.data)
            dispatch({type : GET_OBJECTIVES,payload:response.data})
       }).catch(function (error) {
            dispatch({type : ERROR_GET_OBJECTIVES,errors:error.response.data.detail})
       });
   }
}
     