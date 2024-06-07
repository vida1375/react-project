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

const ChangeProfile =({token, loginUser})=>{
    console.log(token);
    const [show, setShow] = useState(true);
const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [firstNames, setFirstNames] = useState({
        value:"",
        isTouched: false
    });
    const [lastNames, setLastNames] = useState({
        value:"",
        isTouched: false
    });
    const [genders, setGenders] = useState({
        value:"",
        isTouched: false
    });
    const [ages, setAges] = useState({
        value:"",
        isTouched: false
    });
    const [citys, setCitys] = useState({
        value:"",
        isTouched: false
    });
    const nameRegex = /^[a-zA-Z]{3,}$/;
    // const nameRegex = /^[a-zA-Z0-9_.-]*$/;
    const numberRegex = /^[0-9]*$/;
    const genderRegex = /^(?:male|female)$/;
    const req = async()=>{
        try{
           
                const {data} = await axios.put("https://kzico.runflare.run/user/change-profile",
                {
                    firstname: firstName,
                    lastname:lastName,
                    gender:gender,
                    age:age,
                    city:city,
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
                    console.log(data.message);
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
            {   loginUser.email?
                (
                    <Container>
                    <Row>
                        <Col>
                        <SideBar />
                        </Col>
                        <Col>
                        <Form  onSubmit={(e) => e.preventDefault()}  style={{display:"flex", flexDirection:"column" ,alignItems:"center" , marginTop:"3rem"}}>
                              <Row>
                               <Form.Group className="mb-3" controlId="formBasicText" >
                                <Form.Control type="text" placeholder="First Name" onChange={(e) => {
                               setFirstName(e.target.value)
                               setFirstNames({value: e.target.value , isTouched:false})
                             }}
                             onBlur={() =>{
                                setFirstNames((l)=> {return {...l, isTouched:true}})
                            }}
                            onFocus={() =>{
                                setFirstNames((l)=> {return {...l, isTouched:false}})
                            }}
                               />
                                {(firstNames.isTouched && !nameRegex.test(firstNames.value))&& 
                                <Form.Label style={{color:"red"}}>The FirstName is not valid</Form.Label>}
                          </Form.Group>
                              </Row>
                              <Row>
                               <Form.Group className="mb-3" controlId="formBasicText" >
                                <Form.Control type="text" placeholder="Last Name" onChange={(e) => {
                               setLastName(e.target.value)
                               setLastNames({value: e.target.value , isTouched:false})
                             }}
                             onBlur={() =>{
                                setLastNames((l)=> {return {...l, isTouched:true}})
                            }}
                            onFocus={() =>{
                                setLastNames((l)=> {return {...l, isTouched:false}})
                            }}
                               />
                               {(lastNames.isTouched && !nameRegex.test(lastNames.value))&& 
                                <Form.Label style={{color:"red"}}>The LastName is not valid</Form.Label>}
                          </Form.Group>
                              </Row>
                              <Row>
                               <Form.Group className="mb-3" controlId="formBasicText" >
                                <Form.Control type="text" placeholder="Gender" onChange={(e) => {
                               setGender(e.target.value)
                               setGenders({value: e.target.value , isTouched:false})
                             }}
                             onBlur={() =>{
                                setGenders((l)=> {return {...l, isTouched:true}})
                            }}
                            onFocus={() =>{
                                setGenders((l)=> {return {...l, isTouched:false}})
                            }}
                               />
                               {(genders.isTouched && !genderRegex.test(genders.value))&& 
                                <Form.Label style={{color:"red"}}>The Gender is not valid</Form.Label>}
                          </Form.Group>
                              </Row>
                              <Row>
                               <Form.Group className="mb-3" controlId="formBasicText" >
                                <Form.Control type="text" placeholder="Age" onChange={(e) => {
                               setAge(e.target.value)
                               setAges({value: e.target.value , isTouched:false})
                             }}
                             onBlur={() =>{
                                setAges((l)=> {return {...l, isTouched:true}})
                            }}
                            onFocus={() =>{
                                setAges((l)=> {return {...l, isTouched:false}})
                            }}
                               />
                               {(ages.isTouched && !numberRegex.test(ages.value))&& 
                                <Form.Label style={{color:"red"}}>The Age is not valid</Form.Label>}
                          </Form.Group>
                              </Row>
                              <Row>
                               <Form.Group className="mb-3" controlId="formBasicText" >
                                <Form.Control type="text" placeholder="City" onChange={(e) => {
                               setCity(e.target.value)
                               setCitys({value: e.target.value , isTouched:false})
                             }}
                             onBlur={() =>{
                                setCitys((l)=> {return {...l, isTouched:true}})
                            }}
                            onFocus={() =>{
                                setCitys((l)=> {return {...l, isTouched:false}})
                            }}
                               />
                               {(citys.isTouched && !nameRegex.test(citys.value))&& 
                                <Form.Label style={{color:"red"}}>The City is not valid</Form.Label>}
                          </Form.Group>
                              </Row>
                              {
                                ((firstNames.isTouched && nameRegex.test(firstNames.value))&&(lastNames.isTouched && nameRegex.test(lastNames.value))&& (genders.isTouched && genderRegex.test(genders.value)) &&(ages.isTouched && numberRegex.test(ages.value))&&(citys.isTouched && nameRegex.test(citys.value)))?
                                <Button variant="primary" type="submit" onClick={req}  >
                                Done
                         </Button> :""
                              }
                                {/* <Button variant="primary" type="submit" onClick={req}  >
                                Done
                         </Button>  */}
                              
                       </Form>
                        </Col>
                    </Row>
                </Container>
                ):(
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
export default ChangeProfile;
