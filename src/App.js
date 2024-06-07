import React ,{ useState, useEffect}from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Router';
import Navbar from "./components/Navbar";
import CartProvidor from "./components/cartContext";
import axios from "axios";

function App() {
  const [token, setToken] = useState("")
  const [cart, setCart] = useState([])
  const [logins, setLogins] = useState(""); 
//   const [logins,setLogins] = useState({
//     message:'' ,
//     success:'',
//     username:'',
//     email:'',
//     token:'',
// });

function getProductData(id) {

  let productData =cart.find(product => product._id === id);

  if(productData == undefined){
      return undefined
  }
  return productData;
}
const addToCart=(item) =>{
  const quanity = getProductData(item._id);
  if (!quanity) {
    setCart((currentCart) => [...currentCart, item])
  }
}
const deleteToCart=() =>{
setCart(
  cart.filter(item => item._id !== item._id)
  )
}
 const DeleteItem=(id)=>{
  setCart(
    cart.filter(item => item._id !== id)
   )

 }
 
 useEffect(() => {
  const tokenData = localStorage.getItem('token')
  
  if (tokenData) {
      setToken(tokenData)
  }
}, [])

useEffect(() => {
  localStorage.setItem('token', token)
}, [token])
useEffect(() => {
  const cartData = JSON.parse(localStorage.getItem('cart'))
  
  if (cartData) {
      setCart(cartData)
  }
}, [])
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart))
}, [cart])

// useEffect(() => {
//   const loginsData = JSON.parse(localStorage.getItem('logins'))
  
//   if (loginsData) {
//       setLogins(loginsData)
//   }
// }, [])
// useEffect(() => {
//   localStorage.setItem('logins', JSON.stringify(logins))
// }, [logins])


    // const addToLogin=(message, success, username, email, token)=>{
    //   setLogins({
    //     message: message,
    //    success: success,
    //    username: username,
    //    email: email,
    //    token: token,
    // })
    // }
    // const deleteToLogin=()=>{
    //   setLogins(current => {
    //     const {email,success,message,username,token, ...rest} = current;
        
    //     return rest;
    //   });
    // }
    const deleteToLogin=()=>{
      setLogins(current => {
        const {age,email,firstname,gender,image,isAdmin,lastname,mobile,token,username,_id, ...rest} = current;
        
        return rest;
      });
    }
    const handleClick =(item)=>{
      setToken(item);
  }
  const deletetoToken=()=>{
    setToken("");
  }
  const url = "https://kzico.runflare.run/user/profile"
  useEffect(() => {
    axios.get(url,
      {
              headers:{
                  Authorization:
                  // "Bearer ",
                  `Bearer ${token}`
               }
           }
      ).then((r) => {   
              setLogins(r.data.user);
              
        })
  }, [token]);
  
useEffect(() => {
  const checkLoginuserData =()=>{
    const userLogin = localStorage.getItem('token');
    if (userLogin) {
      const datalogin = logins;
    }
    
   
  }
  window.addEventListener("storage", checkLoginuserData)
  return()=>{
    window.removeEventListener("storage",checkLoginuserData);
  };
}, []);
console.log(logins);
  return (
    <CartProvidor>
    <div className="App">
      <Navbar  loginUser={logins} deleteToLogin={deleteToLogin} deletetoToken={deletetoToken} token={token}/>
     <Router addToCart={addToCart} cartList={cart}  loginUser={logins} DeleteItem={DeleteItem} deleteToCart={ deleteToCart} handleClick={handleClick}  token={token}/>
    </div>
    </CartProvidor>
  );
}

export default App;
