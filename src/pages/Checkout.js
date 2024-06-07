import React, { useState, useContext } from "react";
import { Card, Button,Row, Col, Container, Alert} from "react-bootstrap";
import { CartContext } from "../components/cartContext";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const Checkout =({cartlist, addressData, token, deleteToCart, loginUser, deleteToAddressData})=>{
    const cart = useContext(CartContext);
    const [show, setShow] = useState(true);
    const valueCart = cart.item.reduce((sum, productData) => sum + productData.qty, 0);
    const navigate = useNavigate();
    const req = async()=>{
        try{
            const {data} = await axios.post("https://kzico.runflare.run/order/submit",
            {
                orderItems:cart.item,
                shippingAddress:{
                    address: addressData.address,
                    city: addressData.city,
                    postalCode: addressData.postalcode,
                    phone: addressData.phone,
                    
                },
                paymentMethod: "ship",
                shippingPrice:"5",
                totalPrice: cart.getTotalCost(),
    
    
            },
            {
                headers:{
                    authorization:
                    `Bearer ${token}`
                }
            }
            );
            console.log(data);
            cart.deleteAllArray();
            deleteToCart();
            deleteToAddressData();
            if ( data._id ){
                Swal.fire('The order was successfully placed');
              navigate("/", { replace: true });
            } else{
                navigate("/checkout", { replace: true })
            }
        }catch(error){
            console.log(error.response.data);
            let user=[] 
            let list=[]
           Object.entries(error.response.data).map(val=>{
            
           user.push(val)
   
           })
           
        user.map(item=>{
          if (item[0] ==="message") {
        list.push(item[1])
        }
        })
        
            if(error.response.data.success == false){
             let dataError =""
               list.map(i=>{
                dataError += i;
               })
               Swal.fire(dataError)
               navigate("/checkout", { replace: true });
            
        }
        }
    }   
    
      
    const handleToClose = () => {
      setShow(false);
      navigate("/", { replace: true });
  };



      return(
        <div>
          {
           loginUser.email?
            (
              <Container>
        <Card style={{ marginTop:"2rem", padding:"1rem 1rem" }}>
        <Card.Title style={{textAlign:"center"}}>Product</Card.Title>
        
        {cartlist.map((item) =>(
             <Card.Body key={item._id}>
            
            <Row>
               <Col style={{display:"inline-flex", justifyContent:"center", marginTop:"2rem"}}>
            <Card.Img  src={item.image} style={{width:"6rem", height:"6rem" ,margin:"1rem 1rem" }} />
               </Col>
               <Col style={{display:"inline-flex", justifyContent:"center"}}>
                <Card.Text>Name:</Card.Text>
                <Card.Text>{item.name}</Card.Text>
                </Col>
            
               <Col style={{display:"inline-flex", justifyContent:"center"}}> 
               <Card.Text>Price:</Card.Text>
                <Card.Text>{item.price}$</Card.Text>
                </Col>
                <Col style={{display:"inline-flex", justifyContent:"center"}}>
                <Card.Text>Quanity:</Card.Text>
                <Card.Text>{cart.getProductQuanity(item._id)}</Card.Text>
                </Col>
          </Row>
          </Card.Body>
            
        ))}
        <Row>
          <Col style={{display:"flex",direction:"rtl"}}>
            { valueCart>0 ? <h1>total:{cart.getTotalCost()}$</h1>:"" }
          </Col>
          </Row>
        </Card>
        <Card style={{ marginTop:"2rem", padding:"1rem 1rem" }}>
        <Card.Title style={{textAlign:"center"}}>Address</Card.Title>
          <Row>
                <Col style={{display:"inline-flex"}}>
                <Card.Text>City:</Card.Text>
                <Card.Text>{addressData.city}</Card.Text>
                </Col>
          </Row>
          <Row>
                <Col style={{display:"inline-flex"}}>
                <Card.Text>Address:</Card.Text>
                <Card.Text>{addressData.address}</Card.Text>
                </Col>
          </Row>
          <Row>
                <Col style={{display:"inline-flex"}}>
                <Card.Text>Postal Code</Card.Text>
                <Card.Text>{addressData.postalcode}</Card.Text>
                </Col>
          </Row>
          <Row>
                <Col style={{display:"inline-flex"}}>
                <Card.Text>phone:</Card.Text>
                <Card.Text>{addressData.phone}</Card.Text>
                </Col>
          </Row>
           
        </Card>
        <Row style={{margin:"2rem 0"}}> 
           <Col>
            <Button style={{display:"inline-flex"}} as={Link} to="/cart">Edit</Button>
            </Col>
            <Col>
            <Button style={{display:"inline-flex", float:"right"}} onClick={req}>Submit</Button>
            </Col>
           </Row>
        </Container>
            ):(
              <div>
                <Dialog open={show} onClose={handleToClose}>
                  <DialogTitle style={{color:"red"}}>{"Error!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    You do not have access to this page
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleToClose}
                        color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
              </div>
            )
          }
        </div>
      )
  }
  export default Checkout;