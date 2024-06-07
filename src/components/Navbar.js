import React from "react";
import {Container ,Nav ,Col, Row ,Navbar as NavBar, NavDropdown  } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Cart_Icon from "./Cart_Icon";
import * as icons from 'react-bootstrap-icons';
import {useNavigate } from "react-router-dom";

const Navbar =({ deleteToLogin, loginUser,  deletetoToken }) =>{
  const navigate = useNavigate();
  const deleteUser =()=>{
    deleteToLogin();
    deletetoToken();
    navigate("/", { replace: true });
  }






    return(
        <NavBar bg="light" expand="lg">
      <Container fluid>

              <NavBar.Brand as={Link} to="/" style={{fontFamily: 'YekanBalkhMedium'}}>Home</NavBar.Brand>
                <Row>
                <Col>
            <Nav.Link as={Link} to="/cart" ><Cart_Icon /></Nav.Link>
            </Col>
            <Col>
            { !loginUser.email?
              <Nav.Link as={Link} to="/login"><icons.Person size={25}/></Nav.Link>
              :
              <Nav.Link as={Link}  className="navlink">{loginUser.email}
              <Nav className="navdata">
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item  as={Link} to="/order">Order</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/setting/changeProfile" >Setting</NavDropdown.Item>
              <NavDropdown.Item onClick={deleteUser}>Log out</NavDropdown.Item>
              {/* <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              <Nav.Link as={Link} to="/order">Order</Nav.Link>
              <Nav.Link as={Link} to="/setting/changeProfile">Setting</Nav.Link>
              <Nav.Link  onClick={deleteUser} >Log out</Nav.Link> */}
              </Nav >
              </Nav.Link>
            }
            </Col>
            </Row>
      </Container>
    </NavBar>
    )

}
export default Navbar;

// import React from "react";

// const Navbar =() =>{

//     return(
//         <div></div>
//     )

// }
// export default Navbar;