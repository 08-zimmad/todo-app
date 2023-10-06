import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AuthContext from "../context/AuthContext";
import { useContext } from "react";




const Login=()=>{

  let {LoginUser}=useContext(AuthContext);

    return(
      <Form onSubmit={LoginUser}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>username</Form.Label>
        <Form.Control type="text" placeholder="Username" name="Username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>


    );
}



export default Login;