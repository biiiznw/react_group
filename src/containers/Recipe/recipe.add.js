import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
// import { connect, useDispatch, useSelector } from 'react-redux';

import { withRouter } from 'react-router-dom';

// import Aux from '../../hoc/Aux/Aux';
// import Modal from '../../components/UI/Modal/Modal';

// import Spinner from '../../components/UI/Spinner/Spinner';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


function RecipeAdd(props){

    let employee = {
        
    }

    const onChange = (e) => {
        e.persist();
        // setEmployee({...employee, [e.target.name]: e.target.value});
    }

    const saveEmployee = (e) => {
        // setShowLoading(true);
        // e.preventDefault();
        // const data = { firstName: employee.firstName, lastName: employee.lastName, 
        //   email: employee.email, employeeNumber: employee.employeeNumber, department: employee.department, password: employee.password,
        //   position: employee.position, phoneNumber: employee.phoneNumber};
        // axios.post(apiUrl, data)
        //   .then((result) => {
        //     setShowLoading(false);
        //     props.history.push('/show/' + result.data._id)
        //   }).catch((error) => setShowLoading(false));
      };

    return (
        <div>
            <Jumbotron>
            <h1>Recipes: </h1>
                <Form onSubmit={saveEmployee}>
                <Form.Group>
                    <Form.Label>Recipe Name</Form.Label>
                    <Form.Control type="text" name="recipeName" id="recipeName" placeholder="Enter recipe name" value={employee.recipeName} onChange={onChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Item</Form.Label>
                    <Form.Control as="select">
                        <option>Item 1</option>
                        <option>Item 2</option>
                        <option>Item 3</option>
                        <option>Item 4</option>
                        <option>Item 5</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" name="itemQuantity" id="itemQuantity" placeholder="Enter item quantity" value={employee.recipeName} onChange={onChange} />
                </Form.Group>
                <Form.Group>
                    <Button variant="primary">
                        Add Item
                    </Button>
                </Form.Group>
                <Form.Group>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Item 1 - 15 kg</ListGroup.Item>
                        <ListGroup.Item>Item 2 - 25 kg</ListGroup.Item>
                        <ListGroup.Item>Item 3 - 35 kg</ListGroup.Item>
                        <ListGroup.Item>Item 4 - 45 kg</ListGroup.Item>
                    </ListGroup>
                </Form.Group>
                
                {/* <Form.Group>
                    <Form.Label>Recipe Quantity</Form.Label>
                    <Form.Control type="number" name="recipeName" id="employeeNumber" placeholder="Enter Employee Number" value={employee.employeeNumber} onChange={onChange} />
                </Form.Group> */}
                {/* <Form.Group>
                    <Form.Label> Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={employee.lastName} onChange={onChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={employee.email} onChange={onChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" id="password" placeholder="Enter password" value={employee.password} onChange={onChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Department</Form.Label>
                    <Form.Control type="text" name="department" id="department" placeholder="Enter Department" value={employee.department} onChange={onChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Position</Form.Label>
                    <Form.Control type="text" name="position" id="position" placeholder="Enter Position" value={employee.position} onChange={onChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter phone Number" value={employee.phoneNumber} onChange={onChange} />
                </Form.Group> */}
                
                <Button variant="primary" type="submit">
                    Save
                </Button>
                </Form>
            </Jumbotron>
        </div>
       
    );

}

export default withRouter(RecipeAdd);