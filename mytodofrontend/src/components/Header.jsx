import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';




const NavbarColor=styled(Navbar)`
background-color:rgba(14, 114, 230);
`;



const Header=()=>{
    let {user,Logout}=useContext(AuthContext)
    return(
      
      <NavbarColor data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">todo?</Navbar.Brand>
        <Nav className="me-auto">
        
          {user && <Nav.Link href="/">Home</Nav.Link>}
         
          {user ? 
          <>
          <Nav.Link href="/login" onClick={Logout}>Logout</Nav.Link>
          </>
          
           :
          <>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
          </>
          
          }
          
        </Nav>
      </Container>
    </NavbarColor>
    );
}


export default Header;