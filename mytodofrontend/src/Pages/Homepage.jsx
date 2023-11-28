import React from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { getAllTodos } from '../Api/HomePageApi';
import { ToastError, ToastSuccess } from '../utils/Toasts';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { DeleteTodo } from '../Api/HomePageApi';
import AddTodoModal from '../components/AddTodoModal';
import jwt_decode from "jwt-decode";
import EditTodoModal from '../components/EditTodoModal';
import { UpdateTodo } from '../Api/HomePageApi';
import { Form } from 'react-bootstrap';

const StyledButton=styled.span`
  margin-left: 92%
`;



const TodoItem = styled(ListGroup.Item)`
  background-color: ${(props) => (props.completed ? '#d4edda' : '#f8f9fa')};
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e2e6ea;
  }
  strong {
    color: #007bff;
  }
  i {
    color: red;
  }
  .completed-checkbox {
    margin-right: 10px;
  }


`;


const HomePage = () => {

    const {updateToken,Logout}=useContext(AuthContext)
    const [todos, setTodos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);

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


    const handleToggleCompleted = async (id, isCompleted, title, desc) => {
      try {
        const payload = {
          task_id: id,
          is_completed: !isCompleted,
          title:title,
          description:desc
        };
  
        const response = await UpdateTodo(payload);
  
        if (response.status === 200) {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.task_id === id ? { ...todo, is_completed: !isCompleted } : todo
            )
          );
  
          ToastSuccess('Status updated successfully!');
        } else {
          ToastError('Error updating status');
        }
      } catch (err) {
        console.error('Error updating status:', err);
        ToastError('An error occurred while updating the status.');
      }
    };


    const handleUpdate=async(title, desc, date)=>{
      try{
        const payload={
                        'task_id':selectedTodo.task_id
                      ,'title':title,
                      'description': desc,
                      'due_date':date}
        const response= await UpdateTodo(payload);
        if(response.status===200){
          setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.task_id === response.data.task_id ? response.data : todo))
      );
        }
        else{
          ToastError("Unable to update. Try Logging in again")
        }
      }
      catch(err){console.log(err)}
    }




    const updateTodos = (newTodo) => {
      setTodos((prevTodos) => [...prevTodos, newTodo.data]);
    };

    const handleEdit = (todo) => {
      setSelectedTodo(todo);
      setEditModalVisible(true);
    };
  
    const handleCloseEditModal = () => {
      setSelectedTodo(null);
      setEditModalVisible(false);
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
          <ListGroup>
            {todos.map((todo, index) => (

              <TodoItem key={index} completed={todo.is_completed}>
                
                 <strong>{todo.title}</strong><br />
                {todo.description}<br />
                <i style={{ color: isDatePassed(todo.due_date) ? 'red' : 'black' }}> {formatDueDate(todo.due_date)}</i><br />
                <Form.Check
                  type="checkbox"
                  id={`completedCheckbox-${index}`}
                  className="completed-checkbox"
                  checked={todo.is_completed}
                  onChange={() => handleToggleCompleted(todo.task_id, todo.is_completed, todo.title, todo.desc)}
                />
                <StyledButton>
                <EditTodoModal
                    showModal={editModalVisible}
                    handleClose={handleCloseEditModal}
                    selectedTodo={selectedTodo}
                    handleUpdate={handleUpdate}
                  />
                  <Button variant="outline-warning" onClick={() => handleEdit(todo)} style={{margin:'4px'}}><FontAwesomeIcon icon={faPencil} /> </Button>
                <Button variant="outline-danger" onClick={()=>handleDelete(todo.task_id)}><FontAwesomeIcon icon={faTrash} /></Button>
                  </StyledButton>
                </TodoItem>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
      <AddTodoModal updateTodos={updateTodos} />
    </Container>
  );
};

export default HomePage;
