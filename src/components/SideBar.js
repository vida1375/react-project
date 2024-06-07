import React from "react";
import {Container ,Nav ,Col, Row ,Navbar as NavBar  } from 'react-bootstrap';
import { Link } from "react-router-dom";
const SideBar =()=>{
    return(
        <NavBar bg="light" expand="lg" style={{border:"1px solid black",height:"30rem",marginTop:"2rem", marginLeft:"1rem",textAlign:"center"}}>
            <Container style={{marginLeft:"1rem" , marginTop:"-15rem",textAlign:"center"}}>
                <Col>
                <Row style={{marginBottom:"2rem"}}> 
                <Nav.Link as={Link} to="/setting/changeProfile"  >Change Profile</Nav.Link>
                </Row>
                <Row style={{marginBottom:"2rem"}}>
                <Nav.Link as={Link} to="/setting/changePassword" >Change Password</Nav.Link>
                </Row>
                <Row style={{marginBottom:"2rem"}}>
                <Nav.Link as={Link} to="/setting/uploadAvator" >Upload Avator</Nav.Link>
                </Row>
                </Col>
            </Container>
      </NavBar>
    );
}
export default SideBar;