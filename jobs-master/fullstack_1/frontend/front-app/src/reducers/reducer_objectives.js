import {GET_OBJECTIVES,ERROR_GET_OBJECTIVES} from "../actions/index.js"

export default function (state=null,action){
    switch(action.type){
        case GET_OBJECTIVES:
            return action.payload
        case ERROR_GET_OBJECTIVES : 
            return action.errors
    }
    return state
}


