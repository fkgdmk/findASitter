import { ADD_BABY, REMOVE_BABY, ADD_SITTER, REMOVE_SITTER, ADD_BABIES, ADD_USER, REMOVE_USER } from "./actions";
import { combineReducers } from "redux";

/*
    !!! IMPORTANT !!!

    THIS REDUCER IS CURRENTLY NOT USED

    (bug with combineReducers())
    Reducer in use is the rootReducer in store.ts
*/

function babyReducer(state = [], action) {
    switch (action.type) {
        case ADD_BABY:
            action.baby.id = state.length + 1;
            return [...state, action.baby]
        
        case ADD_BABIES:
            console.log("Called add babies.")
            return [...state].concat(action.babies)

        case REMOVE_BABY:
            return Object.assign({}, state, state.filter((baby) => baby.id !== action.id))
    
        default:
            return state;
    }
  }

function sitterReducer(state = [], action) {
    switch (action.type) {
      case ADD_SITTER:
        action.sitter._id = state.length + 1;
        return [...state, action.sitter];

      case REMOVE_SITTER:
            
        break;
    
      default:
         return state;
    }
  }

function userReducer(state = [], action) {
    switch (action.type) {
        case ADD_USER: 
            action.id = state.length + 1;
            return [...state, action.user]
        case REMOVE_USER:
            return Object.assign({}, state, state.filter((user) => user.id !== action.id))
        default: 
            return state;
    }   
}

export const reducer = combineReducers({babies: babyReducer, sitters: sitterReducer})