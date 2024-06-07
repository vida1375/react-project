import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container ,Card,Row, Col,Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const ListOrder =({token, loginUser})=>{
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    const {orderId} = useParams();
    const [data, setData] = useState({});
    const [loadingData, setLoadingData] = useState(false);
  const url = `https://kzico.runflare.run/order/${orderId}`;
  useEffect(() => {
    setLoadingData(true)
    axios.get(url,
        {
            headers:{
                Authorization:
                // "Bearer ",
                `Bearer ${token}`
             }
         }
        ).then((r) => {   
        setData(r.data);
        setLoadingData(false)
          })
    // fetch(url,
    //     {
    //             headers:{
    //                 Authorization:
    //                 // "Bearer ",
    //                 `Bearer ${token}`
    //              }
    //          }
    //     )
    //     .then(res => res.json())
    //     .then(data => setData(data))
}, [url])
let user=[] 
let list=[]
Object.entries(data).map(val=>{
   user.push(val)
   
})

user.map(item=>{
    if (item[0] ==="orderItems") {
        list.push(item[1])
    }
})
const handleToClose = () => {
    setShow(false);
    navigate("/", { replace: true });
};

    return( 
         <div>
            {
               (!loadingData && loginUser.email) ?
                ( <Container style={{marginTop:"2rem",marginBottom:"2rem"}}>
                <Card>
                    {list.map(item=>{
                        return(
                            <Card.Body>
                                {item.map(items=>{
                                    return(
                                        <Row key={items._id} style={{marginTop:"1rem"}}>
                                        <Col style={{display:"inline-flex", justifyContent:"center", marginTop:"2rem"}}>
                                          <Card.Img  src={items.product.image} style={{width:"6rem", height:"6rem" ,margin:"1rem 1rem" }} />
                                       </Col>
                                       <Col style={{display:"inline-flex", justifyContent:"center"}}>
                                         <Card.Text>Name:</Card.Text>
                                           <Card.Text>{items.product.name}</Card.Text>
                                          </Col>
                                        <Col style={{display:"inline-flex", justifyContent:"center"}}> 
                                                    <Card.Text>Price:</Card.Text>
                                                   <Card.Text>{items.product.price}$</Card.Text>
                                         </Col>
                                         <Col style={{display:"inline-flex", justifyContent:"center"}}>
                                              <Card.Text>Quanity:</Card.Text>
                                              <Card.Text>{items.qty}</Card.Text>
                                         </Col>
                                    </Row>
                                    )
                                })}
                                </Card.Body>
                        )
                    })}
                    <Card.Text style={{display:"inline-flex", justifyContent:"right",margin:"1rem"}}>TotalPrice:{data.totalPrice}$</Card.Text>
                </Card>
              </Container>) :(!loadingData && loginUser.email) ? (
          <div style={{textAlign:"center", marginTop:"5rem"}}>loading...</div>
      ):(!loginUser.email)?
      (
        <div>
        <Dialog open={show} onClose={handleToClose}>
          <DialogTitle style={{color:"red"}}>{"Error!"}</DialogTitle>
            <DialogContent>
            <DialogContentText>
             You are not logged in. You must login first to access this page
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
      ):""
            }
         </div>
    )
}
export default ListOrder;