import React from 'react';
import Form from 'react-bootstrap/Form';

const UsernameField=()=> {
  return (
    <>
      <Form.Label>username</Form.Label>
      <Form.Control
        type="text"
        id="username"
        name='username'
      />
    </>
  );
}



const PasswordField=()=> {
    return (
      <>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          aria-describedby="password"
        />
      </>
    );
  }
  
  
export {PasswordField,UsernameField};

