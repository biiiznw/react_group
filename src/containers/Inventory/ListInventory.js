import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
// import Spinner from 'react-bootstrap/Spinner';
// import { withRouter } from 'react-router-dom';
// import Login from '../Auth/Login';

//List items
const ListInventory = props => {
    const [inventory, setInventory] = useState([
        {item:'ITEM_CODE_1', stocked_quantity:100},
        {item:'ITEM_CODE_2', stocked_quantity:200},
    ]);
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:3001/api/items";

    useEffect(() => {
        const fetchData = async () => {
          axios.get(apiUrl)
            .then(result => {
              console.log('result.data:',result.data)
              //check if the user has logged in
               if(result.data.screen !== 'auth')
               {
                console.log('data in if:', result.data )
                setInventory(result.data);
                setShowLoading(false);
              }
            }).catch((error) => {
              console.log('error in fetchData:', error)
            });
          };  
        fetchData();
      }, []);
    
      const showDetail = (id) => {
        props.history.push({
          pathname: '/showitem/' + id
        });
      }
    

    return (
        <div>
        {inventory && inventory.length > 0
        ? <Jumbotron>
            <h1>Inventory: </h1>
            
            <p>
              {/* <Button type="button" variant="primary" onClick={() => { createInventory() }}>Create Item</Button>&nbsp; */}
              {/* <Button type="button" variant="danger" onClick={() => { deleteCookie() }}>Log out</Button> */}
            </p>
            
            <ListGroup>
            {inventory.map((inv, idx) => (
              <ListGroup.Item key={idx} >{inv.item} - {inv.stocked_quantity}</ListGroup.Item>
            ))}
          </ListGroup>
          </Jumbotron>      
        : 'NO RECIPE'
      }
        </div>
    );

}

export default ListInventory;