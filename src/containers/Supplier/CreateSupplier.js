import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

function CreateSupplier(props) {
    //
    const email = props.screen;
    console.log('props.screen',props.screen)
    const [supplier, setSupplier] = useState({ _id: '', supplierCity: '', supplierName: '', supplierManager: '', supplierAddress: '', supplierCity: '', supplierPostal: '' , supplierPhone: ''  });
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "http://localhost:3001/api/items"
    //
    const saveItem = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {itemCode: supplier.supplierCity, itemName: supplier.supplierName, quantity: supplier.supplierManager, 
          supplierCode: supplier.supplierCity, supplier: supplier.supplierAddress, 
          contact: supplier.supplierPostal, email: email};
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
        setSupplier({...supplier, [e.target.name]: e.target.value});
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
                <Form.Label>Item Code</Form.Label>
                <Form.Control type="text" name="itemCode" id="itemCode" placeholder="Enter item Code" value={supplier.supplierCity} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Item Name</Form.Label>
                <Form.Control type="text" name="itemName" id="itemName" placeholder="Enter item Name" value={supplier.supplierName} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" name="quantity" id="quantity" placeholder="Enter Quantity" value={supplier.supplierManager} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Supplier Code</Form.Label>
                <Form.Control type="text" name="supplierCode" id="supplierCode" placeholder="Enter supplier Code" value={supplier.supplierCity} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Supplier</Form.Label>
                <Form.Control type="text" name="supplier" id="supplier" placeholder="Enter supplier" value={supplier.supplierAddress} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Contact</Form.Label>
                <Form.Control type="text" name="contact" id="contact" placeholder="Enter contact" value={supplier.supplierPostal} onChange={onChange} />
              </Form.Group>
                            
              <Button variant="primary" type="submit">
                Save Product
              </Button>
            </Form>
          </Jumbotron>
        </div>
    );


}

export default withRouter(CreateSupplier);
