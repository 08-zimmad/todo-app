import React from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { getAllTodos } from '../Api/HomePageApi';
import { ToastError, ToastSuccess } from '../utils/Toasts';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { DeleteTodo } from '../Api/HomePageApi';
import FloatingButton from '../components/FloatingButton';
import jwt_decode from "jwt-decode";

const DeleteButton=styled.span`
  margin-left: 97%
`;



const HomePage = () => {

    const {updateToken,Logout}=useContext(AuthContext)
    const [todos, setTodos] = useState([]);

    const handleDelete=async (id)=>{
      try{
        const response= await DeleteTodo(id);

        if(response.status===204){
          ToastError("Deleted!")  
          setTodos((prevTodos) => prevTodos.filter(todo => todo.task_id !== id));
        }
        
      }
      catch(err){console.log(err)}
    }


    const updateTodos = (newTodo) => {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

 
    useEffect(() => {
      const fetchData = async () => {
        try{
          let token=JSON.parse(localStorage.getItem("authToken"));
          let decodedToken=jwt_decode(token.access);
          const response = await getAllTodos(decodedToken.user_id);
          if(response.status === 200){setTodos(response.data);}
           else if (response.status===401 || response.response.status===401) {updateToken();}
           else if(response.status===422){Logout(); ToastError("Login Again");}
        }
        catch(error){
          Logout();
        } 
      };
      fetchData();
      }, []);




      function formatDueDate(isoDate) {
        console.log(isoDate)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(isoDate).toLocaleDateString(undefined, options);
      }




      function isDatePassed(isoDate) {
        const dueDate = new Date(isoDate);
        const currentDate = new Date();
        return dueDate < currentDate;
      }

      



  return (
    <Container>
      <h1>Todo List</h1>
      <Card>
        <Card.Body>
          <Card.Title>Your Todos</Card.Title>
          <ListGroup>
            {todos.map((todo, index) => (
              <ListGroup.Item key={index}>
                
                 <strong>{todo.title}</strong><br />
                {todo.description}<br />
                <strong>Due Date:</strong><i style={{ color: isDatePassed(todo.due_date) ? 'red' : 'black' }}> {formatDueDate(todo.due_date)}</i><br />
                <strong>Is Completed:</strong> {todo.is_completed ? 'Yes' : 'No'}
                <DeleteButton>
                  <Button variant="danger" onClick={()=>handleDelete(todo.task_id)}><FontAwesomeIcon icon={faTrash} /></Button>
                  </DeleteButton>
                </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
      <FloatingButton updateTodos={updateTodos} />
    </Container>
  );
};

export default HomePage;
