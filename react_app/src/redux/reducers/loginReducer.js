import { actionTypes } from "../constants/action-types";

const inititalState = {
    userNameResponse : [],
    roleChange: ""
}

export const loginReducer = (state = inititalState, {type, payload}) => {

    switch (type){
        case actionTypes.LOGGED_IN_USER:
            return {
                ...state, 
                userNameResponse: payload
            };
        case actionTypes.ROLE_CHANGE:
            return {
                ...state, 
                roleChange: payload
            };
        default:
            return state;
    }
}