import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
// import Spinner from 'react-bootstrap/Spinner';
// import { withRouter } from 'react-router-dom';
// import Login from '../Auth/Login';

//List items
const ListItem = props => {
    let history = useHistory();
    const [items, setItems] = useState([
        // {name:'Item 1', base_unit:'kg', qty:100}
    ]);
    const [showAlert, setShowAlert] = useState();
    const [showModal, setShowModal] = useState();
    const [showModalResult, setShowModalResult] = useState();
    const [showLoading, setShowLoading] = useState(true);
    // const apiUrl = "http://localhost:3001/api/items";

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
    
    const clickEdit = (id) => {
        history.push(`/items/edit/${id}`);
    }

    const clickDelete = (id) => {
        const deleteFn = async (id) => {
            console.log('delete:'+id);
            const res = await axios.delete(`${props.apiUrl}/item/${id}`);
            if (res && res.data && res.data.error){
                console.log('Error: ' + res.data.error);
            } else if (res && res.data){
                // console.log('res->' + JSON.stringify(res.data));
                setItems(items.filter(i => i._id != id));
                setShowAlert({tltle:'Success', message:'Item deleted!'});
            } 
        };
        setShowModal({title:'Attention!', message:'Are you sure that you want to delete?', cbFunctionYes: () => deleteFn(id)});
    }

    const drawAlert = () => {
        if (showAlert){
            return (
                <Alert variant="danger" onClose={() => setShowAlert()} dismissible>
                    <Alert.Heading>{showAlert.title}</Alert.Heading>
                    <p>
                    {showAlert.message}
                    </p>
                </Alert>
            );
        }
    }

    const drawModal = () => {
        if (showModal){
            return (
                <Modal show={showModal || false} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header>
                        <Modal.Title>{showModal.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{showModal.message}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {setShowModal()}}>
                            No
                        </Button>
                        <Button variant="primary" 
                            onClick={() => {
                                setShowModal();
                                setShowModalResult(true);
                                showModal.cbFunctionYes();
                            }}
                        >
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
    }

    return (
        <div>
            {drawAlert()}
            {drawModal()}
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
                    {items && items.length > 0
                    ?
                    items.map((item, idx) => (
                        <tr key={idx}>
                            <td>{idx}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.baseUnit}</td>
                            <td>
                                <Button type="button" variant="primary" onClick={() => clickEdit(item._id)}>Edit</Button> &nbsp;
                                <Button type="button" variant="primary" onClick={() => clickDelete(item._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))
                    :
                    <tr><td colSpan={5}>NO ITEMS TO SHOW</td></tr>
                    }
                  </tbody>
                </Table>
          </div>
      </div>
    );

}

export default ListItem;