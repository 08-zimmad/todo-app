import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import styled from 'styled-components';
import { ToastContainer } from "react-toastify";


// Centers the div both StyledContainer and StyledForm
// dont know what last 2 attribs are for
const StyledContainer = styled.div`
  margin:0;
  padding: 0;
  background: white;

`;

const StyledForm = styled(Form)`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 400px;
  background: white;
  border-radius: 10px;
  border-width:thin;
  background-color: rgb(251, 251, 251);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;


const Heading=styled.h1`
  padding: 0 0 20px 0;
`;


// space bw elements
const StyledFormGroup = styled(Form.Group)`
  
  // width:50%;
  padding: 0 40px;
  box-sizing: border-box;
  margin: 30px 0;
`;

const StyledButton = styled(Button)`
  color: #fff;
  margin-bottom: 1rem;
`;



const Login = () => {
  const { LoginUser } = useContext(AuthContext);

  return (
    <div>
    <StyledContainer>
    <StyledForm onSubmit={LoginUser}>
      <Heading>Login</Heading>
      <StyledFormGroup controlId="username">
        <Form.Control type="text" placeholder="Username" name="Username" required />
      </StyledFormGroup>

      <StyledFormGroup controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" name="Password" required />
      </StyledFormGroup>
      <StyledButton variant="primary" type="submit">
        Login
      </StyledButton>
    </StyledForm>
    </StyledContainer>
    <ToastContainer/>
    </div>
  );
};

export default Login;