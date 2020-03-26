import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditItem(props) {
  console.log('editItem props:',props.match.params)
  const [item, setItem] = useState({ _id: '', itemCode: '', itemName: '', quantity: '', supplier: '', contact: ''  });  
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/items/" + props.match.params.id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setItem(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateItem = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {itemCode: item.itemCode, itemName: item.itemName, quantity: item.quantity,supplier: item.supplier, contact: item.contact};
    //mimicks vere mush rest api call
    axios.put(apiUrl, data)
      .then((result) => {
        //console.log('after calling put to update',result.data )
        setShowLoading(false);
        props.history.push('/showitem/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setItem({...item, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={updateItem}>

          <Form.Group>
            <Form.Label>Product Code</Form.Label>
            <Form.Control type="text" name="itemCode" id="itemCode" placeholder="Enter Product Code" value={item.itemCode} onChange={onChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" name="itemName" id="itemName" placeholder="Enter Product Name" value={item.itemName} onChange={onChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="text" name="quantity" id="quantity" placeholder="Enter Quantity" value={item.quantity} onChange={onChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Supplier</Form.Label>
            <Form.Control type="text" name="supplier" id="supplier" placeholder="Enter Supplier" value={item.supplier} onChange={onChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Contact</Form.Label>
            <Form.Control type="text" name="contact" id="contact" placeholder="Enter Contact" value={item.contact} onChange={onChange} />
          </Form.Group>
          
          
        
          <Button variant="primary" type="submit">
            Update Product
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditItem);
