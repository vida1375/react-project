import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware,
  } from "redux";
  import {  products , users } from "./reducer";
  import thunk from "redux-thunk";
  const reducers = combineReducers({ products,users  });
  const middleWare = [thunk];
  const store = createStore(
    reducers,
    applyMiddleware(...middleWare) 
  );
  // export const cartStore = createStore(cartReducer);
  export default store;