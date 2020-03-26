import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

function CreateItem(props) {
    //
    const email = props.screen;
    console.log('props.screen',props.screen)
    const [item, setItem] = useState({ _id: '', itemCode: '', itemName: '', quantity: '', supplier: '', contact: '' , email: ''  });
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "http://localhost:3000/api/items"
    //
    const saveItem = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {itemCode: item.itemCode, itemName: item.itemName, quantity: item.quantity, supplier: item.supplier, contact: item.contact, email: email};
        //
        axios.post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            props.history.push('/showitem/' + result.data._id)
        }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();
        setItem({...item, [e.target.name]: e.target.value});
      }
    
    return (
        <div>
        <h2> Create a Product {email} </h2>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
        <Jumbotron>
            <Form onSubmit={saveItem}>
              <Form.Group>
                <Form.Label>Product Code</Form.Label>
                <Form.Control type="text" name="itemCode" id="itemCode" placeholder="Enter item Code" value={item.itemCode} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" name="itemName" id="itemName" placeholder="Enter item Name" value={item.itemName} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" name="quantity" id="quantity" placeholder="Enter Quantity" value={item.quantity} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Supplier</Form.Label>
                <Form.Control type="text" name="supplier" id="supplier" placeholder="Enter supplier" value={item.supplier} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Contact</Form.Label>
                <Form.Control type="text" name="contact" id="contact" placeholder="Enter contact" value={item.contact} onChange={onChange} />
              </Form.Group>
                            
              <Button variant="primary" type="submit">
                Save Product
              </Button>
            </Form>
          </Jumbotron>
        </div>
    );


}

export default withRouter(CreateItem);
