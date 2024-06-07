import React ,{useContext, useState, useEffect}from "react";
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Order from "./pages/Order";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { GetProfile } from "./pages/GetProfile";
import Address from "./pages/Address";
import Checkout from "./pages/Checkout";
import ListOrder from "./pages/ListOrder";
import ChangeProfile from "./pages/ChangeProfile";
import ChangePassword from "./pages/ChangePasswoed";
import UploadProfileImage from "./pages/UploadProfileImage";
import NotFound from "./pages/NotFound";


const Router = ({addToCart , cartList , loginUser, deleteToCart, DeleteItem, token, handleClick}) =>{
    
    const [addressData,setAddressData] = useState({
        city:'' ,
        address:'',
        postalcode:'',
        phone:'',
    });
    // const uniqueNumbers = cartList.filter ((value, index, array) => { 
    //     return array.indexOf (value) == index;
    // });
    
      useEffect(() => {
        const addressDatas = JSON.parse(localStorage.getItem('addressData'))
        
        if (addressDatas) {
            setAddressData(addressDatas)
        }
      }, [])
      useEffect(() => {
        localStorage.setItem('addressData', JSON.stringify(addressData))
      }, [addressData])

   
    const addAddress=(cityItem,addressItem, postalItem, phoneItem)=>{
        setAddressData({
            city: cityItem,
           address: addressItem,
           postalcode: postalItem,
           phone: phoneItem,
        })
    }
    const deleteToAddressData=()=>{
        setAddressData(current => {
          const {city,address,postalcode,phone, ...rest} = current;
          
          return rest;
        });
      }
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/product/:productId" element={<Product addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart  cartlist={cartList} loginUser={loginUser} DeleteItem={DeleteItem}/>} />
            <Route path="/login" element={<Login handleClick={handleClick} loginUser={loginUser} />} />
            <Route path="/signup" element={<Signup  loginUser={loginUser} />} />
            <Route path="/profile" element={<GetProfile token={token} loginUser={loginUser} />} />
            <Route path="/address" element={<Address addAddress={addAddress} loginUser={loginUser} />} />
            <Route path="/checkout" element={<Checkout  loginUser={loginUser} deleteToCart={deleteToCart} cartlist={cartList} addressData={addressData} token={token} deleteToAddressData={deleteToAddressData} />} />
            <Route path="/order" element={<Order token={token} loginUser={loginUser}/>} />
            <Route path="/order/:orderId" element={<ListOrder token={token} loginUser={loginUser} />} />
            <Route path="/setting/changeProfile" element={<ChangeProfile token={token} loginUser={loginUser} />} />
            <Route path="/setting/changePassword" element={<ChangePassword token={token}  loginUser={loginUser}/>} />
            <Route path="/setting/uploadAvator" element={<UploadProfileImage token={token} loginUser={loginUser} />} />
        </Routes>
    );

};
export default Router;