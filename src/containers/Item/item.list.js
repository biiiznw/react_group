import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom';
import axios from 'axios';
// import Spinner from 'react-bootstrap/Spinner';
// import { withRouter } from 'react-router-dom';
// import Login from '../Auth/Login';

//List items
const ListItem = props => {
    const [items, setItems] = useState([
        // {name:'Item 1', base_unit:'kg', qty:100}
    ]);
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:3001/api/items";

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`${props.apiUrl}/item`);
            if (res && res.data && res.data.error){
                console.log('Error: ' + res.data.error);
            } else if (res && res.data){
                // console.log('res->' + JSON.stringify(res.data));
                setItems(res.data);
            }  
        }
        fetchData();
    }, []);
    
      const showDetail = (id) => {
        props.history.push({
          pathname: '/showitem/' + id
        });
      }
      const createItem = () => {
        
      }
    

    return (
        <div>
        {items && items.length > 0
          ? 
            <div>
              <h1>Items: </h1>
              
              <p>
                <Link to={"/items/add"}>
                    <Button type="button" variant="primary">New</Button>
                </Link>
                {/* <Button type="button" variant="primary" onClick={() => { createItem() }}>New</Button>&nbsp; */}
                {/* <Button type="button" variant="danger" onClick={() => { deleteCookie() }}>Log out</Button> */}
              </p>
              
              <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Base Unit</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                        <tr>
                            <td>{idx}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.baseUnit}</td>
                            <td>
                                <Button type="button" variant="primary">Edit</Button> &nbsp;
                                <Button type="button" variant="primary">Delete</Button>
                            </td>
                        </tr>
                    ))}
                  </tbody>
                </Table>
          </div>
          : 'No Item to Show'
        }
      </div>
    );

}

export default ListItem;