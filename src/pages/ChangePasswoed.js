import React ,{useState}from "react";
import {Container ,Button ,Col, Row,Form   } from 'react-bootstrap';
import axios from "axios";
import SideBar from "../components/SideBar";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";


const ChangePassword =({token, loginUser})=>{
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const [passwords, setPasswords] = useState({
        value:"",
        isTouched: false
    });
    const req = async()=>{
        try{
            const {data} = await axios.put("https://kzico.runflare.run/user/change-password",
            {
                old_password:oldPassword,
                new_password:newPassword,
            },
            {
                headers:{
                    Authorization:
                    `Bearer ${token}`
                 }
             }
            );
            console.log(data);
            if (data.success ==true){
                Swal.fire(data.message)
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
            
        }
        }
    }
    
    const handleToClose = () => {
        setShow(false);
        navigate("/", { replace: true });
    };


    return(
            <div>
                {  loginUser.email ?
                    (<Container>
                        <Row>
                            <Col>
                            <SideBar />
                            </Col>
                            <Col>
                            <Form  onSubmit={(e) => e.preventDefault()}  style={{display:"flex", flexDirection:"column" ,alignItems:"center" , marginTop:"3rem"}}>
                                 <Row>
                                 <Form.Group className="mb-3" >
                                      <Form.Control type="password" placeholder="Old Password" onChange={(e => setOldPassword(e.target.value))}/>
                                  </Form.Group>
                                 </Row>
                                 <Row>
                                 <Form.Group className="mb-3" >
                                      <Form.Control type="password" placeholder="New Password" onChange={(e => {
                                        setNewPassword(e.target.value)
                                        setPasswords({value: e.target.value , isTouched:false})
                                      })}
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
                                 </Row>
                                 {(passwords.isTouched && passwordRegex.test(passwords.value))?
                                 <Button variant="primary" type="submit" onClick={req}  >
                                    Done
                               </Button>:"" 
                                }
                                 
                           </Form>
                            </Col>
                        </Row>
                    </Container>):(
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
                    )
                }
            </div>
    );
}
export default ChangePassword;