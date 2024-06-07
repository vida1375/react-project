import React, { useContext }from "react";
import { CartContext } from "./cartContext";
import * as icons from 'react-bootstrap-icons';

const Cart_Icon =() =>{
    const cart = useContext(CartContext);
    const valueCart = cart.item.reduce((sum, productData) => sum + productData.qty, 0)
    return(
        <div>
            <icons.Cart size={25}/>
            <span>{valueCart}</span>
        </div>
    )
}

export default Cart_Icon;