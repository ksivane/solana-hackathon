import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { mintReducer } from "./mintReducer";


export const reducers = combineReducers({
    loginReducer : loginReducer,
    mintReducer : mintReducer
})

export default reducers;