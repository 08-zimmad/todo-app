import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ToastError,ToastSuccess } from "../utils/Toasts";
import { RegisterUserAxios } from "../Api/RegisterApi";
import { useNavigate } from "react-router-dom";



// read Login Forms comments to understand styling
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


const Register=()=>{

    const [registerUser, setRegisterUser]=useState({
      username:'',
      email:'',
      password:'',
    })

    let password2="";
    const navigate=useNavigate();



    const handleChange=(e)=>{
      const {name,value}=e.target
      setRegisterUser({...registerUser,[name]:value})
    }


    const handlePassword2=(e)=>{
      password2=e.target.value;
    }




    const handleSubmit=async(e)=>{
      e.preventDefault()
      if(registerUser.password!==password2){
        ToastError("Password Doesn't Match");
      }
      else{
          try{
            const response=await RegisterUserAxios(registerUser);
              if(response.status===201){
                navigate('/login');
                setTimeout(() => {
                  ToastSuccess("Signed Up successfully... welcome on Board")
                }, 3000);
              }
            else{
              ToastError(response.message)
            }
          }
          catch(error){
            ToastError(error.message)
          }
        }
    }




    return (
      <div>
        <StyledContainer>
        <StyledForm onSubmit={handleSubmit} >
          <Heading>Register</Heading>
          <StyledFormGroup controlId="username">
            <Form.Control type="text" placeholder="Username" name="username" value={registerUser.username} onChange={handleChange} required />
          </StyledFormGroup>

          <StyledFormGroup controlId="email">
            <Form.Control type="email" placeholder="E-mail" name="email" onChange={handleChange} required/>
          </StyledFormGroup>
    
          <StyledFormGroup controlId="Password1">
            <Form.Control type="password" placeholder="Password" name="password"  onChange={handleChange} required/>
          </StyledFormGroup>

          <StyledFormGroup controlId="Password2">
            <Form.Control type="password" placeholder="Password" name="password2" onChange={handlePassword2} required/>
          </StyledFormGroup>

          <StyledButton variant="primary" type="submit">
            Register
          </StyledButton>
        </StyledForm>
        </StyledContainer>

        <ToastContainer/>
        </div>
       
      );
}











export default Register;