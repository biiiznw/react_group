import React from 'react';
import { withRouter } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';


const Sales = props => {
    return (
        <div>
            <Jumbotron>
            <h2> Product Name </h2>
            <p> </p>
            <ListGroup>
                <ListGroup.Item>item1</ListGroup.Item>
                <ListGroup.Item>item2</ListGroup.Item>
                <ListGroup.Item>item3</ListGroup.Item>
            </ListGroup>
            </Jumbotron> 
        </div>
    );
}
export default withRouter(Sales);