import React, {useState, useEffect} from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


function ItemAdd(props){

    const [item, setItem] = useState({
        itemName:'',
        itemQuantity: '',
        itemBaseUnit: '',
    });

    const onChange = (e) => {
        e.persist();
        // setEmployee({...employee, [e.target.name]: e.target.value});
        setItem({...item, [e.target.name]: e.target.value});
    }
    const cancel = () => {
        props.history.goBack();
    }

    const saveItem = async (e) => {
        // setShowLoading(true);
        e.preventDefault();
        console.log('saving');
        // const data = { firstName: employee.firstName, lastName: employee.lastName, 
        //   email: employee.email, employeeNumber: employee.employeeNumber, department: employee.department, password: employee.password,
        //   position: employee.position, phoneNumber: employee.phoneNumber};
        let res;
        if (props.match.params.id){
            res = await axios.put(`${props.apiUrl}/item/${props.match.params.id}`, {name: item.itemName, quantity: item.itemQuantity, baseUnit: item.itemBaseUnit});
        } else {
            res = await axios.post(`${props.apiUrl}/item`, {name: item.itemName, quantity: item.itemQuantity, baseUnit: item.itemBaseUnit});
        }
        
        if (res && res.data && res.data.error){
            // setShowLoading(false);
            //props.history.push('/item');
            console.log('Error: ' + res.data.error);
        } else if (res && res.data){
            console.log('saved');
            console.log('res->' + res.data);
            props.history.goBack();
        }
      };
    
      useEffect(() => {
        
        async function fetchData(idItem) {
            const res = await axios.get(`${props.apiUrl}/item/${idItem}`);
            if (res && res.data && res.data.error){
                console.log('Error: ' + res.data.error);
            } else if (res && res.data){
                // console.log('res->' + JSON.stringify(res.data));
                setItem({
                    itemName:res.data.name,
                    itemQuantity: res.data.quantity,
                    itemBaseUnit: res.data.baseUnit,
                });
            }  
        }
        if (props.match.params.id){
            fetchData(props.match.params.id);
        }
    }, []);

    return (
        <div>
            <Jumbotron>
                <h1>Items: </h1>
                <h1>{props.match.params.id} </h1>
                <Form onSubmit={saveItem}>
                <Form.Group>
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control type="text" name="itemName" id="itemName" placeholder="Enter Item Name" value={item.itemName} onChange={onChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" name="itemQuantity" id="itemQuantity" placeholder="Enter Item Quantity" value={item.itemQuantity} onChange={onChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Base Unit</Form.Label>
                    <Form.Control type="text" name="itemBaseUnit" id="itemBaseUnit" placeholder="Enter Item Base Unit" value={item.itemBaseUnit} onChange={onChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
                &nbsp;
                <Button variant="primary" onClick={() => cancel()}>
                    Cancel
                </Button>
                </Form>
            </Jumbotron>
        </div>
       
    );

}

export default withRouter(ItemAdd);