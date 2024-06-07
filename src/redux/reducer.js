import { type } from "@testing-library/user-event/dist/type";
// import { ADD_TO_CART } from "./action";

export const products = (
    state = { data: [], loading: false, error: "" },
    { type, payload }
  ) => {
    switch (type) {
      case "productLoading":
        return payload;
      case "productSuccess":
        return payload;
      case "productFailed":
        return payload;
      default:
        return state;
    }
  };
  export const users = (
    state = { data: [], loading: false, error: "" },
    { type, payload }
  ) => {
    switch (type) {
      case "userLoading":
        return payload;
      case "userSuccess":
        return payload;
      case "userFailed":
        return payload;
      default:
        return state;
    }
  };

// export function cartReducer(state=[],{type,payload}){
//   switch (type) {
//     case "ADD_TO_CART":
//       return [...state , payload ];
//       case "ADD_TO_CART_Faild":
//         return [...state , payload ];
//     default:
//       return state;
//   }
//   console.log(payload);
// }