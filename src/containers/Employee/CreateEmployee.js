import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
//employee number, password, first name, last name, department, position, phone number, email

const CreateEmployee = props => {
  const [employee, setEmployee] = useState({ _id: '', employeeNumber: '', firstName: '', lastName: '', 
                email: '',department: '',position: '',phoneNumber: '',password: '' });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3001/";

  const saveEmployee = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { firstName: employee.firstName, lastName: employee.lastName, 
      email: employee.email, employeeNumber: employee.employeeNumber, department: employee.department, password: employee.password,
      position: employee.position, phoneNumber: employee.phoneNumber};
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setEmployee({...employee, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={saveEmployee}>
          <Form.Group>
            <Form.Label> Employee Number</Form.Label>
            <Form.Control type="number" name="employeeNumber" id="employeeNumber" placeholder="Enter Employee Number" value={employee.employeeNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={employee.firstName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={employee.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={employee.email} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" id="password" placeholder="Enter password" value={employee.password} onChange={onChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Department</Form.Label>
            <Form.Control type="text" name="department" id="department" placeholder="Enter Department" value={employee.department} onChange={onChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Position</Form.Label>
            <Form.Control type="text" name="position" id="position" placeholder="Enter Position" value={employee.position} onChange={onChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter phone Number" value={employee.phoneNumber} onChange={onChange} />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateEmployee);
