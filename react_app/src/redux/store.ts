import { createStore, applyMiddleware , compose } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";

const composeEnhancers =  compose;

const store = createStore(
    reducers, /* preloadedState, */
   {},
   composeEnhancers(applyMiddleware(thunk)));

   export type RootState = ReturnType<typeof store.getState>;
   
export default store;