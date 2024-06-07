import React, { useState} from "react";
import { Form, Button} from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const Signup =({loginUser})=>{
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const req = async()=>{
        try{
            const {data} = await axios.post("https://kzico.runflare.run/user/signup",
            {
                username: name,
                email:email,
                password:password,
                mobile:mobile


            }
            );
            console.log(data);
            if (data.success !==true){
                navigate("/signup", { replace: true });
              } else{
                Swal.fire(data.message)
                navigate("/login", { replace: true });
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
    const nameRegex = /^[a-zA-Z0-9_.-]{5,}$/;
   const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const phoneRegex = /^(0)?9\d{9}$/;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [emails, setEmails] = useState({
        value:"",
        isTouched: false
    });
    const [names, setNames] = useState({
        value:"",
        isTouched: false
    });
    const [passwords, setPasswords] = useState({
        value:"",
        isTouched: false
    });
    const [cpasswords, setCpasswords] = useState({
        value:"",
        isTouched: false
    });
    const [mobiles, setMobiles] = useState({
        value:"",
        isTouched: false
    });


    const handleToClose = () => {
        setShow(false);
        navigate("/", { replace: true });
    };
    return (
            <div>
                {
                    !loginUser.email?
                    (
                                <Form  onSubmit={(e) => e.preventDefault()}  style={{display:"flex", flexDirection:"column" ,alignItems:"center" , marginTop:"3rem"}}>
                                    <Form.Group className="mb-3" controlId="formBasicText" >
                                <Form.Label>User Name:</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" onChange={(e) => {
                                    setName(e.target.value)
                                    setNames({value: e.target.value , isTouched:false})
                                }}
                                onBlur={() =>{
                                    setNames((l)=> {return {...l, isTouched:true}})
                                }}
                                onFocus={() =>{
                                    setNames((l)=> {return {...l, isTouched:false}})
                                }}
                                />
                                { (names.isTouched && !nameRegex.test(names.value))&& 
                                    <Form.Label style={{color:"red"}}>
                                    The Name is valid
                                    </Form.Label>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail" >
                                <Form.Label>Email :</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e)=> {
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
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e)=> {
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
                            <Form.Group className="mb-3"  >
                                <Form.Label>Confirm of Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e)=> {
                                    setCPassword(e.target.value)
                                    setCpasswords({value: e.target.value , isTouched:false})
                                }}
                                onBlur={() =>{
                                    setCpasswords((l)=> {return {...l, isTouched:true}})
                                }}
                                onFocus={() =>{
                                    setCpasswords((l)=> {return {...l, isTouched:false}})
                                }}
                                />
                                { (cpasswords.isTouched && !passwordRegex.test(cpasswords.value))&& 
                                    <Form.Label style={{color:"red"}}>
                                    The Confirm of Password is valid
                                    </Form.Label>}
                            </Form.Group>
                            <Form.Group className="mb-3"  >
                                <Form.Label>Mobile:</Form.Label>
                                <Form.Control type="number" placeholder="Enter mobile" onChange={(e)=> {
                                    setMobile(e.target.value)
                                    setMobiles({value: e.target.value , isTouched:false})

                                }}
                                onBlur={() =>{
                                    setMobiles((l)=> {return {...l, isTouched:true}})
                                }}
                                onFocus={() =>{
                                    setMobiles((l)=> {return {...l, isTouched:false}})
                                }}
                                />
                                { (mobiles.isTouched && !phoneRegex.test(mobiles.value))&& 
                                    <Form.Label style={{color:"red"}}>
                                    The Phone is valid
                                    </Form.Label>}
                            </Form.Group>
                            {(password !== cpassword)&&
                                    <Form.Label style={{color:"red"}}>
                                    The Password is not equal The Confirm of Password
                                </Form.Label>}
                                {((names.isTouched && nameRegex.test(names.value))&&(emails.isTouched && emailRegex.test(emails.value))&& (passwords.isTouched && passwordRegex.test(passwords.value)) &&(cpasswords.isTouched && passwordRegex.test(cpasswords.value))&&(mobiles.isTouched && phoneRegex.test(mobiles.value)) && (password == cpassword) )?
                                <Button variant="primary" type="submit" onClick={req}  >
                                Signup
                            </Button>:""   
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
export default Signup;

