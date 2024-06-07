import React, { useState } from "react";
import { Form, Button} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";


const Address =({addAddress, loginUser})=>{
      const navigate = useNavigate();
      const [show, setShow] = useState(true);
      const [city,setCity]=useState("")
      const [address,setAddress]=useState("")
      const [postalcode,setPostalcode]=useState("")
      const [phone,setPhone]=useState("")
      const [citys, setCitys] = useState({
        value:"",
        isTouched: false
    });
    const [addresss, setAddresss] = useState({
      value:"",
      isTouched: false
  });
    const [postalcodes, setPostalcodes] = useState({
    value:"",
    isTouched: false
   });
    const [phones, setPhones] = useState({
     value:"",
     isTouched: false
    });
    const namesRegex = /^[a-zA-Z]{3,}$/;
    const nameRegex = /^[a-zA-Z0-9_.-]{10,}$/;
    const numberRegex = /^[0-9]*$/;
    const phoneRegex=/^(0)?9\d{9}$/;

      const req =()=>{
       addAddress(city, address, postalcode, phone);
      }

      const handleToClose = () => {
        setShow(false);
        navigate("/", { replace: true });
    };

      return(
         <div>
          {
            loginUser.email ?
            (
              <Form  onSubmit={(e) => e.preventDefault()}  style={{display:"flex", flexDirection:"column" ,alignItems:"center" , marginTop:"3rem"}}>
              <Form.Group className="mb-3"  >
              <Form.Label >City:</Form.Label>
                <Form.Control  placeholder="City" onChange={(e)=>{
                  setCity(e.target.value)
                  setCitys({value: e.target.value , isTouched:false})
                }}
                onBlur={() =>{
                  setCitys((l)=> {return {...l, isTouched:true}})
              }}
              onFocus={() =>{
                  setCitys((l)=> {return {...l, isTouched:false}})
              }}/>
              {(citys.isTouched && !namesRegex.test(citys.value))&& 
              <Form.Label style={{color:"red"}}>The City is not valid</Form.Label>}
              </Form.Group>
        
              <Form.Group className="mb-3"  >
              <Form.Label >Addresss</Form.Label>
                <Form.Control  placeholder="Adresss"onChange={(e)=>{
                  setAddress(e.target.value)
                  setAddresss({value: e.target.value , isTouched:false})
                }} 
                onBlur={() =>{
                  setAddresss((l)=> {return {...l, isTouched:true}})
              }}
              onFocus={() =>{
                  setAddresss((l)=> {return {...l, isTouched:false}})
              }}/>
              {(addresss.isTouched && !nameRegex.test(addresss.value))&& 
              <Form.Label style={{color:"red"}}>The Address is not valid</Form.Label>}
              </Form.Group>
              <Form.Group className="mb-3"  >
              <Form.Label >Postal Code:</Form.Label>
                <Form.Control  placeholder="Postal Code" onChange={(e)=>{
                  setPostalcode(e.target.value)
                  setPostalcodes({value: e.target.value , isTouched:false})
                }} 
                onBlur={() =>{
                  setPostalcodes((l)=> {return {...l, isTouched:true}})
              }}
              onFocus={() =>{
                  setPostalcodes((l)=> {return {...l, isTouched:false}})
              }}/>
              {(postalcodes.isTouched && !numberRegex.test(postalcodes.value))&& 
              <Form.Label style={{color:"red"}}>The Postal Code is not valid</Form.Label>}
              </Form.Group>
              <Form.Group className="mb-3"  >
              <Form.Label >Phone Number:</Form.Label>
                <Form.Control  placeholder="Phone Number"onChange={(e)=>{
                  setPhone(e.target.value)
                  setPhones({value: e.target.value , isTouched:false})
                } }
                onBlur={() =>{
                  setPhones((l)=> {return {...l, isTouched:true}})
              }}
              onFocus={() =>{
                  setPhones((l)=> {return {...l, isTouched:false}})
              }} />
              {(phones.isTouched && !phoneRegex.test(phones.value))&& 
              <Form.Label style={{color:"red"}}>The Phone Number is not valid</Form.Label>}
              </Form.Group>
               {((citys.isTouched && namesRegex.test(citys.value))&&(addresss.isTouched && nameRegex.test(addresss.value))&& (postalcodes.isTouched && numberRegex.test(postalcodes.value)) &&(phones.isTouched && phoneRegex.test(phones.value))) ?
               <Button variant="primary" type="submit"  onClick={req} as={Link} to="/checkout" >
               Next
             </Button> :""
              }
            
              
              
            </Form>
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
  export default Address;