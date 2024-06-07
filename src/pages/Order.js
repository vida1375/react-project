import React ,{useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container ,Card,Row, Col, Button} from "react-bootstrap";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const Order =({token , loginUser}) =>{
    const [data, setData] = useState("")
    const [show, setShow] = useState(true);
const navigate = useNavigate();
    const [loadingData, setLoadingData] = useState(false);
    let user=[]
    const url = "https://kzico.runflare.run/order";
    useEffect(() => {
      setLoadingData(true)
      axios.get(url,
        {
          headers:{
              Authorization:
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
        //                 `Bearer ${token}`
        //              }
        //          }
        //     )
        //     .then(res => res.json())
        //     .then(data => setData(data))
    }, [])
    Object.values(data).forEach(val=>{
        user.push(val)
    })  
    
    const handleToClose = () => {
      setShow(false);
      navigate("/", { replace: true });
  };
    

    return(
      <div>
        {
        (!loadingData && loginUser.email) ?
        (
          <Container style={{marginTop:"2rem",marginBottom:"2rem"}}>
       {user.map(item=>{
        return(
            <Card key={item._id} as={Link} to={item._id.toString()} style={{ marginTop:"2rem", padding:"1rem 1rem",textDecoration:"none",color:"black" }} > 
                {item.orderItems.map(items=>{
                    
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
            <Card.Text style={{display:"inline-flex", justifyContent:"right"}}>TotalPrice:{item.totalPrice}$</Card.Text>
                </Card>
        )
       })}
      </Container>
        )
        : (loadingData && loginUser.email) ?
        (
          <div style={{textAlign:"center", marginTop:"5rem"}}>loading...</div>
      ):(!loginUser.email) ?
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
export default Order;