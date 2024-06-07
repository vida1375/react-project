import React ,{useContext} from "react";
import { CartContext } from "../components/cartContext";
import { Container ,Card,Row, Col, Button,Table } from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Cart =({cartlist, loginUser, DeleteItem}) =>{
    const cart = useContext(CartContext);
    const navigate = useNavigate();
    const valueCart = cart.item.reduce((sum, productData) => sum + productData.qty, 0);
    // const DeleteItem = (text)=>{
    //     cartlist.map((item)=>{
    //         if (item._id === text) {
    //            cartlist.splice(text,1) 
    //         }
    //     })
    // }
     if(! cart.item.length){
      cartlist.map(item=> cartlist.splice(item._id,1))
        return <div style={{textAlign:"center",marginTop:"5rem"}}>
            <h1>Cart is Empty</h1>
        </div>
     }


    const cartHandleUser=()=>{
      if (!loginUser.email){
        navigate("/login", { replace: true });
      }else{
        navigate("/address", { replace: true });
      }
    } 
    return(
        <Container>
        <Table striped>
          <thead>
           <tr>
          <th><Col style={{marginLeft:"3rem"}}>Image</Col></th>
          <th><Col style={{marginLeft:"1rem"}}>Name</Col></th>
          <th><Col style={{marginLeft:"0rem"}}>Price</Col></th>
          <th ><Col style={{marginLeft:"3rem"}}>Number</Col></th>
        </tr>
      </thead>
      <tbody >
      {cartlist.map((item) =>(
        <tr key={item._id} >
        <td>
            <img src={item.image} style={{width:"8rem", height:"8rem" ,margin:"1rem 1rem" }} />
        </td>
        <td><Col style={{marginTop:"3rem"}}>{item.name}</Col></td>
        <td> <Col style={{marginTop:"3rem"}}>{item.price}$</Col></td>
        <td>
            <Row >
                <Col>{cart.getProductQuanity(item._id)>1?<Button style={{marginTop:"3rem"}} onClick={() => cart.removeOneFromCart(item._id)}>-</Button>:<Button style={{marginTop:"3rem"}} >-</Button>}</Col>
                <Col>
                {cart.getProductQuanity(item._id)<= item.countInStock ?<Card.Text style={{marginTop:"3rem"}}>{cart.getProductQuanity(item._id)} </Card.Text>
                : <span>{item.countInStock}</span>
                  }
                </Col>
                <Col>
                {cart.getProductQuanity(item._id)< item.countInStock ?<Button style={{marginTop:"3rem"}} onClick={()=> cart.addOneToCart(item._id)} >+</Button>
                :<Button style={{marginTop:"3rem"}} >+</Button>}
                </Col>
            </Row>
        </td>
        <td>
        <Button style={{marginTop:"3rem"}} variant="danger" onClick={() => {
                cart.deleteFromCart(item._id)
                DeleteItem(item._id)
               }}>Delete</Button>
        </td>
      </tr>

      ))}
      </tbody>
      </Table>
      <Row style={{marginTop:"15rem",marginBottom:"3rem"}}>
        <Col style={{display:"inline-flex"}}>
      { valueCart>0 ? <h1>total:{cart.getTotalCost()}</h1>:"" }
      </Col>
      <Col style={{display:"flex",direction:"rtl"}}>
       {valueCart>0? <Button variant="success"onClick={cartHandleUser} >Next</Button>:""}
       </Col>
      </Row>
</Container>
        
        
    )
}

export default Cart;