import { IBaby, Baby } from "./entities/baby";
import { ISitter } from "./entities/sitter";
import { IUser } from "./entities/user";
import { ADD_BABY, REMOVE_BABY, ADD_SITTER, REMOVE_SITTER, LOGIN, FETCH_DATA, ADD_BABIES, ADD_SITTERS, ADD_USER, ADD_USERS, REMOVE_USER, EDIT_BABY } from "./actions";
import { HttpClient } from "@angular/common/http";
import { combineReducers, createStore, Store } from "redux";
import { reducer } from "./reducers";

export interface IAppState {
    babies: IBaby[];
    sitters: ISitter[];
    users: IUser[];
    loggedInUser: IUser;    
}

export const INITIAL_STATE: IAppState = {
    babies: [],
    sitters: [],
    users: [],
    loggedInUser: null
}

export function rootReducer(state, action) {
    switch (action.type) {
            /* LOGIN */
        case LOGIN:
            console.log("Called login dispatch.")
            return Object.assign({}, state, {
                loggedInUsers: action.user
            });

            /* BABIES */
        case ADD_BABY:
            console.log("Called add baby.")
            return Object.assign({}, state, {
                babies: [...state.babies, action.baby]
            })
        
        case ADD_BABIES:
            console.log("Called add babies.")
            return Object.assign({}, state, {
                babies: [...state.babies].concat(action.babies)
            })
        
        case EDIT_BABY:
            console.log("Called edit baby.")
            console.log("state", state.babies);
            let updatedBabies = state.babies;
            let index = state.babies.findIndex((b) => b._id == action.baby._id);
            updatedBabies[index] = action.baby;
            return Object.assign({}, state, {
                babies: updatedBabies
            })

        case REMOVE_BABY:
            console.log("Removing baby...")
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

            /* USERS */
        case ADD_USER:
            console.log("Called add user.")
            return Object.assign({}, state, {
                users: [...state.users, action.user]
            })

        case ADD_USERS:
            console.log("Called add users.")
            return Object.assign({}, state, {
                users: [...state.users].concat(action.users)
            });
    
        case REMOVE_USER:
            return Object.assign({}, state, {
                users: state.users.filter((user) => user._id !== action.id)
            })

            /* END */
        default:
            return state;
    }
}

//unsubscribe();