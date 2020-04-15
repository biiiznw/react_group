import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
// import Spinner from 'react-bootstrap/Spinner';
// import { withRouter } from 'react-router-dom';
// import Login from '../Auth/Login';

//List items
const ListItem = props => {
    const [items, setItems] = useState([
        {name:'Item 1', base_unit:'kg', qty:100}
    ]);
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:3001/api/items";

    // useEffect(() => {
    //     const fetchData = async () => {
    //       axios.get(apiUrl)
    //         .then(result => {
    //           console.log('result.data:',result.data)
    //           //check if the user has logged in
    //            if(result.data.screen !== 'auth')
    //            {
    //             console.log('data in if:', result.data )
    //             setData(result.data);
    //             setShowLoading(false);
    //           }
    //         }).catch((error) => {
    //           console.log('error in fetchData:', error)
    //         });
    //       };  
    //     fetchData();
    //   }, []);
    
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
          ? <Jumbotron>
              <h1>Items: </h1>
              
              <p>
                <Link to={"/items/add"}>
                    <Button type="button" variant="primary">New</Button>
                </Link>
                {/* <Button type="button" variant="primary" onClick={() => { createItem() }}>New</Button>&nbsp; */}
                {/* <Button type="button" variant="danger" onClick={() => { deleteCookie() }}>Log out</Button> */}
              </p>
              
              <ListGroup>
              {items.map((item, idx) => (
                <ListGroup.Item key={idx} >{item.name} - {item.qty} {item.base_unit}</ListGroup.Item>
              ))}
            </ListGroup>
            </Jumbotron>      
          : 'NO RECIPE'
        }
      </div>
    );

}

export default ListItem;