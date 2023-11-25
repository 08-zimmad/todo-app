import React, { useState, forwardRef } from "react";
import styled from "styled-components";
import {Container,Button} from "react-bootstrap";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddTodo } from "../Api/HomePageApi";
import { decodedAccess } from "../decodedToken";
import { ToastError, ToastSuccess } from "../utils/Toasts";

const StyledFloatingButton=styled.button`
position:fixed;
width:60px;
height:60px;
bottom:40px;
background-color:rgba(14, 114, 230);
right:40px;
color:#FFF;
border-radius:50px;
text-align:center;
box-shadow: 2px 2px 3px #999;
border: none;
`;





const FloatingButton=({updateTodos})=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [date, setDate] = useState(new Date());

    const handleTitleChange=(e)=>{
      setTitle(e.target.value);
    }
    const handleDescChange=(e)=>{
      setDesc(e.target.value);
    }

      const DateAndTime = forwardRef(({ value, onClick }, ref) => (
        <Button variant="outline-primary" onClick={onClick} ref={ref}>
          {value}
        </Button>
      ));
      const formattedDate = date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      const formattedTime = date.toLocaleTimeString('en-CA', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,  
      });

      const formattedDateTime = `${formattedDate}T${formattedTime}Z`;
      
      

      let handleColor = (time) => {
        return time.getHours() > 12 ? "text-success" : "text-error";
      };

      const handleSubmit= async (e)=>{
        e.preventDefault();
        const payload={
          "title":title,
          "description":desc,
          "due_date":formattedDateTime,
          "is_completed":false,
          "user":decodedAccess().user_id
        };
        const response=await AddTodo(payload);
        if(response.status===201){updateTodos(response.data)}
        else ToastError("Try login Again")
      }




    return(
        <Container>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
        <Modal.Body>
        
      <Form.Group className="mb-3" controlId="Title">
        <Form.Control type="text" placeholder="Title" onChange={handleTitleChange}  required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="">
        <Form.Control as="textarea" rows={3} placeholder="to do...." onChange={handleDescChange} required  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="date">
        <Form.Label>Due Date/Time:</Form.Label>
    <DatePicker
     showTimeSelect
      selected={date}
      onChange={(date) => setDate(date)}
      dateFormat="yyyy/MM/dd" 
      timeClassName={handleColor}
      customInput={<DateAndTime />}/>
      </Form.Group>
    
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
            <StyledFloatingButton onClick={handleShow}><FontAwesomeIcon icon={faPlus}  size="2xl"/></StyledFloatingButton>
        </Container>
    )
}
export default FloatingButton;