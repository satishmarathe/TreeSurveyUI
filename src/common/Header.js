import React, { useState } from "react";
import {
 Navbar,
 Nav,
 NavDropdown,
 Form,
 FormControl,
 Button
} from "react-bootstrap";
 

 
const Header = () => {
 const [modalShow, setModalShow] = useState(false);
 
 return (
   <Navbar bg="primary" variant="dark" expand="md">
     <Navbar.Brand href="#home">Tree-Survey</Navbar.Brand>
     <Navbar.Toggle aria-controls="basic-navbar-nav" />
     <Navbar.Collapse id="basic-navbar-nav">
       <Nav className="mr-auto">
         
         
       </Nav>
       
     </Navbar.Collapse>
   </Navbar>
 );
};
export default Header;