import { actionTypes } from "../constants/action-types";

const inititalState = {
    mintDataValues : [],
    mintResponse: {},
    mintProductDataValues:[],
    burnComponentData: [],
    mintComponentFlag: false,
    mintProductFlag: false,
    burnProductFlag: false,
    addAsAChildValue:[],
    addAsAChildButton: false,
    burnResponseData:[],
    addAsAChildReproduceValue: [],
    mintProductProductDataValues: []
}

export const mintReducer = (state = inititalState, {type, payload}) => {

    switch (type){
        case actionTypes.MINT_COMPONENTS_DATA:
            console.log('mint Component 3 ***');
            return {
                ...state, 
                mintDataValues : payload
            };
        case actionTypes.MINT_RESPONSE:
            return {
                ...state, 
                mintResponse : payload
            };
        case actionTypes.MINT_PRODUCTS_DATA:
            console.log('mintAProduct3 ****');
            return {
                ...state, 
                mintProductDataValues : payload
            };
        case actionTypes.MINT_COMPONENT_FLAG:
            return {
                ...state, 
                mintComponentFlag : payload
            };
        case actionTypes.MINT_PRODUCT_FLAG:
            return {
                ...state, 
                mintProductFlag : payload
            };
        case actionTypes.BURN_PRODUCT_FLAG:
            return {
                ...state, 
                burnProductFlag : payload
            };
        case actionTypes.BURN_COMPONENT_DATA:
            return {
                ...state, 
                burnComponentData : payload
            };
        case actionTypes.CHECK_BOX_VALUE:
            return {
                ...state, 
                checkBoxValue : payload
            };
        case actionTypes.ADD_AS_A_CHILD:
            return {
                ...state, 
                addAsAChildValue : payload
            };
        case actionTypes.ADD_AS_A_CHILD1:
            return {
                ...state, 
                addAsAChildReproduceValue : payload
            };
        case actionTypes.MINT_PRODUCTS_PRODUCE_DATA:
            return {
                ...state, 
                mintProductProductDataValues : payload
            };
        case actionTypes.ADD_AS_A_CHILD_BUTTON:
            return {
                ...state, 
                addAsAChildButton : payload
            };
        case actionTypes.BURN_RESPONSE_DATA:
            return {
                ...state, 
                burnResponseData : payload
            };
        default:
            return state;
    }
}