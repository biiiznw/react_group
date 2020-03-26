import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
//employee number, password, first name, last name, department, position, phone number, email
function EditEmployee(props) {
  const [employee, setEmployee] = useState({_id: '', employeeNumber: '', firstName: '', lastName: '', 
  email: '',department: '',position: '',phoneNumber: '',password: '' });  
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/employees/" + props.match.params.id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setEmployee(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateEmployee = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { firstName: employee.firstName, lastName: employee.lastName, 
      email: employee.email, employeeNumber: employee.employeeNumber, department: employee.department, password: employee.password,
    position: employee.position, phoneNumber: employee.phoneNumber};
    axios.put(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
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
        <Form onSubmit={updateEmployee}>

          <Form.Group>
            <Form.Label>Employee Number</Form.Label>
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
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={employee.email} onChange={onChange} readOnly />
          </Form.Group>

          <Form.Group>
            <Form.Label>Department</Form.Label>
            <Form.Control type="text" name="department" id="department" placeholder="Enter Department" value={employee.department} onChange={onChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Position</Form.Label>
            <Form.Control type="position" name="position" id="position" placeholder="Enter position" value={employee.position} onChange={onChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter phoneNumber" value={employee.phoneNumber} onChange={onChange} />
          </Form.Group>
          
        
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditEmployee);
