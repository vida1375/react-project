import axios from "axios";
// export const ADD_TO_CART ='[PRODUCT] ADD_To_CART';

// export function addToCard(product){
//   return {type: ADD_TO_CART , payload: product}
// };

// export const addToCard =(product)=> async(dispatch,getState)=>{
//   dispatch({
//     type:"ADD_TO_CART",
//     payload:{data:[...data,product]}
//   })
// }
export const getProducts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "productLoading",
      payload: { data: [], loading: true, error: "" },
    });
    const { data } = await axios("http://kzico.runflare.run/product/");
    dispatch({
      type: "productSuccess",
      payload: { data: [...data], loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: "productFailed",
      payload: { data: [], loading: false, error: error.message },
    });
  }
};

export const getPosts = () => async (dispatch, getState) => {
  try {
    const { data } = await axios("http://kzico.runflare.run/product/");
    dispatch({
      type: "productDataSuccess",
      payload: { data: [...data] },
    });
  } catch (error) {
    dispatch({
      type: "productDataFailed",
      payload: { data: [] },
    });
  }
};

export const getUsers = (token) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "userLoading",
      payload: { data: [], loading: true, error: "" },
    });
    const {data} = await axios("https://kzico.runflare.run/user/profile",
    {
        headers:{
            Authorization:
            // "Bearer ",
            `Bearer ${token}`
        }
    }
    );
    dispatch({
      type: "userSuccess",
      payload: { data: [...data], loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: "userFailed",
      payload: { data: [], loading: false, error: error.message },
    });
  }
};