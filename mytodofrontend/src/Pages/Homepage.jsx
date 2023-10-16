import React from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import jwtDecode from 'jwt-decode';




const HomePage = () => {

    const {UpdateToken}=useContext(AuthContext)
    const [todos, setTodos] = useState([]);



    useEffect(() => {
      const fetchData = async () => {
        let token=JSON.parse(localStorage.getItem("authToken"));
        let decodedToken=jwtDecode(token.access)


        const response = await fetch(`http://localhost:8000/auth/api/todos/${decodedToken.user_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token.access}`,
            'Content-Type': 'application/json',
          },});
        if (response.status !== 200) {
          UpdateToken();
        }
        else if(response.status === 200){
          let data=await response.json()
          setTodos(data)
        }
      };
      fetchData();
      }, []);




      function formatDueDate(isoDate) {
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
                </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HomePage;
