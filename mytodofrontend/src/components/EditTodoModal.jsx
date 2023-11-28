import { useState, forwardRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from 'react';
import { UpdateTodo } from '../Api/HomePageApi';

function EditTodoModal({ showModal, handleClose, selectedTodo, handleUpdate }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(new Date());


  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title || '');
      setDesc(selectedTodo.description || '');
      setDate(new Date(selectedTodo.due_date) || new Date());
    }
  }, [selectedTodo]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

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


    const handleSaveChanges = async () => {
      try {
        const updatedTodo = await handleUpdate(title, desc, formattedDateTime);
        handleClose(updatedTodo);
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Form >
        <Modal.Body>
        
      <Form.Group className="mb-3" controlId="Title">
        <Form.Control type="text" placeholder="Title" value={title} onChange={handleTitleChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="">
        <Form.Control as="textarea" rows={3} placeholder="to do...." value={desc} onChange={handleDescChange} required  />
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
        </Form>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={ handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTodoModal;