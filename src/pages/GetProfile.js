import React ,{useEffect, useState}from "react";
import { Container, Row,Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

export const GetProfile=({token, loginUser})=>{
        const [show, setShow] = useState(true);
    const navigate = useNavigate();
        const [loadingData, setLoadingData] = useState(false);
     let list=[]
     let user=[]
    const [datauser, setDatauser] = useState(""); 
    const url = "https://kzico.runflare.run/user/profile"
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
                        console.log(r.data);
                        setDatauser(r.data);
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
        //     .then(data => setDatauser(data))
    }, []);
    
       Object.entries(datauser).forEach((val)=>{
        user.push(val)
       })
       user.map(item=>{
        if (item[0] ==="user") {
            list.push(item[1])
        }
    })

    const handleToClose = () => {
        setShow(false);
        navigate("/", { replace: true });
    };
    return (
       <Container >
       {
       (!loadingData && loginUser.email) ?
        ( <Card style={{ margin:"3rem 1rem",padding:"2rem 1rem"}}>
        {list.map(item=>{
             return(
                <Col key={item._id}>
                <Row style={{justifyContent:"center",marginBottom:"1rem"}}>
                <Card.Img  src={item.image} style={{width:"10rem", height:"10rem" ,margin:"1rem 1rem",display:"inline-flex" }} /> 
                </Row>
                <Row>
                <Col style={{display:"inline-flex",margin:"1rem 1rem"}}>
                      <Card.Text style={{margin:"0 1rem"}}>Email:</Card.Text>
                       <Card.Text>{item.email}</Card.Text>
               </Col>
                </Row>
                <Row>
                <Col style={{display:"inline-flex",margin:"1rem 1rem"}}>
                      <Card.Text style={{margin:"0 1rem"}}>User Name:</Card.Text>
                       <Card.Text>{item.username}</Card.Text>
               </Col>
                </Row>
                <Row>
                <Col style={{display:"inline-flex",margin:"1rem 1rem"}}>
                      <Card.Text style={{margin:"0 1rem"}}>Mobile:</Card.Text>
                       <Card.Text>{item.mobile}</Card.Text>
               </Col>
                </Row>
                <Row>
                <Col style={{display:"inline-flex",margin:"1rem 1rem"}}>
                      <Card.Text style={{margin:"0 1rem"}}>First Name:</Card.Text>
                       <Card.Text>{item.firstname}</Card.Text>
               </Col>
                </Row>
                <Row>
                <Col style={{display:"inline-flex",margin:"1rem 1rem"}}>
                      <Card.Text style={{margin:"0 1rem"}}>Last Name:</Card.Text>
                       <Card.Text>{item.lastname}</Card.Text>
               </Col>
                </Row>
                <Row>
                <Col style={{display:"inline-flex",margin:"1rem 1rem"}}>
                      <Card.Text style={{margin:"0 1rem"}}>Gender:</Card.Text>
                       <Card.Text>{item.gender}</Card.Text>
               </Col>
                </Row>
                <Row>
                <Col style={{display:"inline-flex",margin:"1rem 1rem"}}>
                      <Card.Text style={{margin:"0 1rem"}}>Age:</Card.Text>
                       <Card.Text>{item.age}</Card.Text>
               </Col>
                </Row>
                <Row>
                <Col style={{display:"inline-flex",margin:"1rem 1rem"}}>
                      <Card.Text style={{margin:"0 1rem"}}>City:</Card.Text>
                       <Card.Text>{item.city}</Card.Text>
               </Col>
                </Row>
                </Col>   
             )
        })}

</Card>):(loadingData && loginUser.email)?(
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
       </Container>
    )
}