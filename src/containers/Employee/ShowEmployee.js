import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { withRouter } from 'react-router-dom';

function ShowEmployee(props) {
  const [data, setData] = useState({});
  const [item, setItem] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/employees/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log(result.data);
      if(result.data.item)
      {
        setItem(result.data.item);
      }
      
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editEmployee = (id) => {
    props.history.push({
      pathname: '/edit/' + id
    });
  };

  const deleteEmployee = (id) => {
    setShowLoading(true);
    const employee = { firstName: data.firstName, lastName: data.lastName, 
      email: data.email, employeeNumber: data.employeeNumber, address: data.address, password: data.password,
    city: data.city, phoneNumber: data.phoneNumber, program: data.program };
  
    axios.delete(apiUrl, employee)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/list')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>
        <h1>Employee Number: {data.employeeNumber}</h1>
        <p>Name: {data.firstName}, {data.lastName}</p>
        <p>Email: {data.email}</p>

        <p>
          <Button type="button" variant="primary" onClick={() => { editEmployee(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteEmployee(data._id) }}>Delete</Button>
        </p>
        <h3>Items for logged in user:</h3>
            <ListGroup>
            {item.map((item, idx) => (
              <ListGroup.Item key={idx} >{item.itemName}</ListGroup.Item>
            ))}
          </ListGroup>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowEmployee);
