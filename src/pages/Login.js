import React, { useState ,useContext } from "react";
import { Form, Button, Col, Row} from "react-bootstrap";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../components/cartContext";
import Swal from 'sweetalert2';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const Login =({handleClick, loginUser})=>{
  const cart = useContext(CartContext);
  const [show, setShow] = useState(true);
const navigate = useNavigate();
const valueCart = cart.item.reduce((sum, productData) => sum + productData.qty, 0)  
const req = async()=>{
  try{
      const {data} = await axios.post("https://kzico.runflare.run/user/login",
      {
          email:email,
          password:password


      }
      );
      console.log(data);
      if (data.success ===true) {
        // addToLogin(data.message, data.success, data.user.username, data.user.email, data.user.token);
      handleClick(data.user.token);
      }
      if (data.success ===true && valueCart>0){
        Swal.fire(data.message)
        navigate("/address", { replace: true });
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
             navigate("/signup", { replace: true });
          
      }
  }
}   

  const reqValue = async()=>{
    try{
        const {data} = await axios.post("https://kzico.runflare.run/user/login",
        {
            email:email,
            password:password


        }
        );
        console.log(data);
        if (data.success ===true) {
          // addToLogin(data.message, data.success, data.user.username, data.user.email, data.user.token);
        handleClick(data.user.token);
        }
        if (data.success ===true && valueCart==0){
          Swal.fire(data.message)
          navigate("/", { replace: true });
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
               navigate("/signup", { replace: true });
            
        }
    }
}  
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    // const passwordRegex =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  
    const [emails, setEmails] = useState({
      value:"",
      isTouched: false
  });
    const [passwords, setPasswords] = useState({
      value:"",
      isTouched: false
  });

  const handleToClose = () => {
    setShow(false);
    navigate("/", { replace: true });
};

    return(
      
       <div>
        {
          !loginUser.email?
          (
            <Form  onSubmit={(e) => e.preventDefault()}  style={{display:"flex", flexDirection:"column" ,alignItems:"center" , marginTop:"3rem"}}>
            <Form.Group className="mb-3" controlId="formBasicEmail" >
              <Form.Label>Email :</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => {
                setEmail(e.target.value)
                setEmails({value: e.target.value , isTouched:false})
              }}
              onBlur={() =>{
                setEmails((l)=> {return {...l, isTouched:true}})
            }}
            onFocus={() =>{
                setEmails((l)=> {return {...l, isTouched:false}})
            }}
              />
               {(emails.isTouched && !emailRegex.test(emails.value))&& 
              <Form.Label style={{color:"red"}}>The Email is not valid</Form.Label>}
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword" >
              <Form.Label>Password: </Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) =>{
                 setPassword(e.target.value)
                 setPasswords({value: e.target.value , isTouched:false})
              }}
              onBlur={() =>{
                setPasswords((l)=> {return {...l, isTouched:true}})
            }}
            onFocus={() =>{
                setPasswords((l)=> {return {...l, isTouched:false}})
            }}
              />
               { (passwords.isTouched && !passwordRegex.test(passwords.value))&& 
              <Form.Label style={{color:"red"}}>
                The Password is valid
              </Form.Label>}
              
            </Form.Group>
            <Row > 
                  <Col>
                 
            
             {
              ((emails.isTouched && emailRegex.test(emails.value))&& (passwords.isTouched && passwordRegex.test(passwords.value)) && (valueCart>0))?
              <Button tyle={{display:"inline-flex", float:"right"}} variant="primary" type="submit"  onClick={req}  >
              Log in
             </Button>: ((emails.isTouched && emailRegex.test(emails.value))&& (passwords.isTouched && passwordRegex.test(passwords.value)) && (valueCart==0))?
             <Button tyle={{display:"inline-flex", float:"right"}} variant="primary" type="submit"  onClick={reqValue}  >
             Log in
            </Button>:""
             }
                  </Col>
                  <Col>
                  <Button as={Link} to="/signup" style={{width:"100px"}} >Sign up</Button>
                  </Col>
                 </Row> 
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
export default Login;