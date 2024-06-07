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


const UploadProfileImage =({token, loginUser})=>{
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    const [pic, setPic] = useState("");
    const req = async()=>{
        const formData = new FormData();
        formData.append("profile-image", pic);
        try{
            const {data} = await axios.post("https://kzico.runflare.run/user/profile-image",
            formData,
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
            {     loginUser.email ?
                ( <Container>
                    <Row>
                        <Col>
                        <SideBar />
                        </Col>
                        <Col>
                        <Form  onSubmit={(e) => e.preventDefault()}  style={{display:"flex", flexDirection:"column" ,alignItems:"center" , marginTop:"3rem"}}>
                             <Row>
                             <Form.Group className="mb-3" >
                                  <Form.Control type="file" placeholder="Old Password" onChange={(e => setPic(e.target.files[0]))}/>
                              </Form.Group>
                             </Row>
                              <Button variant="primary" type="submit" onClick={req}  >
                                    Upload
                             </Button>
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
export default UploadProfileImage;