import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';


const Sales = props => {

    // read the info from props, coming from the ancestor component
    const { screen, setScreen, employee } = props;
    // return a stateful value and funcion to update it
    const [data, setData] = useState();

    const [item, setItem] = useState('');
    // called when user clicks on Logout button
    // to clear the cookie and set the screen state variable 
    // back to its initial state.
    const deleteCookie = async () => {
        try {
        await axios.get('/signout');
        setScreen('auth');
        } catch (e) {
        console.log(e);
        }
    };

    return (
        <div>
            <Jumbotron>
            <h2> Product Name </h2>
            <p> </p>
            <ListGroup>
                {/* {item.map((item, idx) => (
                <ListGroup.Item key={idx} >{item.itemName} {item.quantity}</ListGroup.Item>
                ))} */}
                <ListGroup.Item>item2</ListGroup.Item>
                <ListGroup.Item>item3</ListGroup.Item>
            </ListGroup>
            </Jumbotron> 
        </div>
    );
}
export default withRouter(Sales);

{/* <Jumbotron>
            <h1>Logged In Employee: {employee.employeeNumber}</h1>
            <p>Employee Number: {employee.employeeNumber}</p> 
            <p>Employee Name: {employee.firstName}, {employee.lastName}</p>
            <p>
              <Button type="button" variant="primary" onClick={() => { showItem() }}>Create Item</Button>&nbsp;
              <Button type="button" variant="danger" onClick={() => { deleteCookie() }}>Log out</Button>
            </p>
            <h3>Created Items by Employee:</h3>
            <ListGroup>
            {employee.item.map((item, idx) => (
              <ListGroup.Item key={idx} >{item.itemName}</ListGroup.Item>
            ))}
          </ListGroup>
          </Jumbotron>      
        : <CreateItem screen={screen} setScreen={setScreen} /> */}