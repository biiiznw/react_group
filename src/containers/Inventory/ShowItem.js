import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowItem(props) {
  console.log('props.match.params',props.match.params.id)
  const [data, setData] = useState({});
  const [employee, setEmployee] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3001/api/items/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('results from items',result.data);

      console.log("Result Data: ");
      console.log(result.data);
      setEmployee(result.data.employee);
      setData(result.data);

      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editItem = (id) => {
    props.history.push({
      pathname: '/edititem/' + id
    });
  };

  const deleteItem = (id) => {
    setShowLoading(true);
    const item = { itemCode: data.itemCode, itemName: data.itemName, supplier: data.supplier, contact: data.contact };
    //
    axios.delete(apiUrl, item)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/listitem')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>
        <h1>Item Name: {data.itemName}</h1>
        <p>Item Code: {data.itemCode}</p>
        <p>Supplier: {data.supplier}</p>
        <p>Contact: {data.contact}</p>
        <p>For Employee: {employee.firstName} {employee.lastName} </p>

        <p>
          <Button type="button" variant="primary" onClick={() => { editItem(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteItem(data._id) }}>Delete</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowItem);
