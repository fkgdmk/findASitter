import { IBaby, Baby } from "./entities/baby";
import { ISitter } from "./entities/sitter";
import { IUser } from "./entities/user";
import { ADD_BABY, REMOVE_BABY, ADD_SITTER, REMOVE_SITTER, LOGIN, FETCH_DATA, ADD_BABIES, ADD_SITTERS } from "./actions";
import { HttpClient } from "@angular/common/http";
import { combineReducers, createStore, Store } from "redux";
import { reducer } from "./reducers";

export interface IAppState {
    babies: IBaby[];
    sitters: ISitter[];    
}

export const INITIAL_STATE: IAppState = {
    babies: [],
    sitters: []
}

export function rootReducer(state, action) {
    switch (action.type) {
            /* LOGIN */
        case LOGIN:
            action.user._id = state.loggedInUsers.length + 1;
            return Object.assign({}, state, {
                loggedInUsers: state.loggedInUsers.concat(Object.assign({}, action.user))
            });

            /* BABIES */
        case ADD_BABY:
            console.log("Called add baby.")
            //action.baby.id = state.babies.length + 1;
            return Object.assign({}, state, {
                babies: [...state.babies, action.baby]
            })
        
        case ADD_BABIES:
            console.log("Called add babies.")
            return Object.assign({}, state, {
                babies: [...state.babies].concat(action.babies)
            })

        case REMOVE_BABY:
            console.log("Removing baby...")
            console.log(action.id)
            state.babies.forEach(baby => {
                console.log(baby._id);
            });
            return Object.assign({}, state, {
                babies: state.babies.filter((baby) => baby._id !== action.id)
            })

            /* SITTERS */
        case ADD_SITTER:
            action.sitter._id = state.length + 1;
            return [...state, action.sitter];

        case ADD_SITTERS:
            console.log("Called add sitters.")
            return [...state].concat(action.sitters)
    
        case REMOVE_SITTER:
            return Object.assign({}, state, {
                sitters: state.filter((sitter) => sitter._id !== action.id)
            })

            /* END */
        default:
            return state;
    }
}

//unsubscribe();