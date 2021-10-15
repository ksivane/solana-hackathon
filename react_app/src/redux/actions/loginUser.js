import { actionTypes } from "../constants/action-types";

export const loginUser = (username) => 
    async (dispatch) => {
      dispatch({type: actionTypes.LOGGED_IN_USER, payload: username})
    }


export const mintComponentsData = (mintData, mintComponent, mintDataValues) => 
    async (dispatch) => {
      let showData = {};
      console.log('mint Component 2 ***');
      let formData = [];
      showData.id = mintData.componentid;
      showData.description = mintData.description;
      showData.name = mintData.name;
      showData.serielNo = mintData.serielNo;
      showData.parent = 0 ;
      formData.push(showData);
      console.log('formData ***', formData[0]);
      localStorage.setItem(mintData.componentid, JSON.stringify(formData[0]));
      dispatch({type: actionTypes.MINT_COMPONENTS_DATA, payload: [mintData, mintComponent, formData[0]]})
}

export const mintProductComponentsData = (mintProductData, mintAProduct) => 
    async (dispatch) => {
      let showData = {};
      let formData = [];
      showData.id = mintProductData.componentid; 
      showData.description = mintProductData.description;
      showData.name = mintProductData.name;
      showData.serielNo = mintProductData.serielNo;
      showData.parent = 0 ;
      formData.push(showData);
      localStorage.setItem(mintProductData.componentid, JSON.stringify(formData[0]));
      dispatch({type: actionTypes.MINT_PRODUCTS_DATA, payload: [mintProductData, mintAProduct]})
}

export const mintReproduceProductComponentsData = (mintProductData, mintAProduct) => 
    async (dispatch) => {
      let showData = {};
      let formData = [];
      showData.id = mintProductData.componentid; 
      showData.description = mintProductData.description;
      showData.name = mintProductData.name;
      showData.serielNo = mintProductData.serielNo;
      showData.parent = 0 ;
      formData.push(showData);
      localStorage.setItem(mintProductData.componentid, JSON.stringify(formData[0]));
      dispatch({type: actionTypes.MINT_PRODUCTS_PRODUCE_DATA, payload: [mintProductData, mintAProduct]})
}




export const burnComponentData = (burnAProduct, selectedBurnComponentId) => 
    async (dispatch) => {
      dispatch({type: actionTypes.BURN_COMPONENT_DATA, payload: [burnAProduct, selectedBurnComponentId]})
}

export const mintComponent = (flag) => 
    async (dispatch) => {
      dispatch({type: actionTypes.MINT_COMPONENT_FLAG, payload: flag})
}

export const mintProduct = (flag) => 
    async (dispatch) => {
      dispatch({type: actionTypes.MINT_PRODUCT_FLAG, payload:flag})
}
export const burnProduct = (flag) => 
    async (dispatch) => {
      dispatch({type: actionTypes.BURN_PRODUCT_FLAG, payload:flag})
}

export const checkboxValue = (value) => 
    async (dispatch) => {
      dispatch({type: actionTypes.CHECK_BOX_VALUE, payload:value})
}

export const mintResponse = (mintResponseData) => 
    async (dispatch) => {
      dispatch({type: actionTypes.MINT_RESPONSE, payload: mintResponseData})
}

export const addAsAChild = (addAsAChild, selectedChildProduct) => 
    async (dispatch) => {
      dispatch({type: actionTypes.ADD_AS_A_CHILD, payload: [addAsAChild, selectedChildProduct]})
}

export const addAsAChild1 = (addAsAChild1, selectedChildProduct1) => 
    async (dispatch) => {
      dispatch({type: actionTypes.ADD_AS_A_CHILD1, payload: [addAsAChild1, selectedChildProduct1]})
}

export const enableAddAsaChildButton = (flag) => 
    async (dispatch) => {
      dispatch({type: actionTypes.ADD_AS_A_CHILD_BUTTON, payload: flag})
}

export const roleChange = (roleChange) => 
    async (dispatch) => {
      dispatch({type: actionTypes.ROLE_CHANGE, payload: roleChange})
}

export const burnResponse = (burnResponseVal) => 
    async (dispatch) => {
      dispatch({type: actionTypes.BURN_RESPONSE_DATA, payload: burnResponseVal})
}


