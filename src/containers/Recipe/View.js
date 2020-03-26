import CreateItem from '../Inventory/createItem';
import EditItem from '../Inventory/EditItem';
import React, { useState } from 'react';
import ListItem from '../Inventory/ListItem';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
//
import axios from 'axios';
//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen, employee } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //

  console.log("loading component view:");
  console.log(props);
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
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/welcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
  const inventory = (email) => {
    console.log('in items: ',email)
  }
  //
  const createItem = () => {
    console.log('in createItem')
    setItem('y')

  }
  //
  return (
    <div className="App">
      {item !== 'y'
        ? <Jumbotron>
            <h1>Logged In Employee: {employee.employeeNumber}</h1>
            <p>Employee Number: {employee.employeeNumber}</p> 
            <p>Employee Name: {employee.firstName}, {employee.lastName}</p>
            <p>
              <Button type="button" variant="primary" onClick={() => { createItem() }}>Create Item</Button>&nbsp;
              <Button type="button" variant="danger" onClick={() => { deleteCookie() }}>Log out</Button>
            </p>
            <h3>Created Items by Employee:</h3>
            <ListGroup>
            {employee.item.map((item, idx) => (
              <ListGroup.Item key={idx} >{item.itemName}</ListGroup.Item>
            ))}
          </ListGroup>
          </Jumbotron>      
        : <CreateItem screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

//
export default View;