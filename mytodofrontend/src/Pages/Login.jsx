import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import styled from 'styled-components';




const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const StyledForm = styled(Form)`
  max-width: 300px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  background-color: #007bff;
  color: #fff;
  &:hover {
    background-color: #0056b3;
  }
`;



const Login = () => {
  const { LoginUser } = useContext(AuthContext);

  return (
    <StyledContainer>
    <StyledForm onSubmit={LoginUser}>
      <StyledFormGroup controlId="username">
        <Form.Control type="text" placeholder="Username" name="Username" />
      </StyledFormGroup>

      <StyledFormGroup controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" name="Password" />
      </StyledFormGroup>
      <StyledButton variant="primary" type="submit">
        Login
      </StyledButton>
    </StyledForm>
    </StyledContainer>
  );
};

export default Login;