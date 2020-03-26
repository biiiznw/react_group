import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';


class Inventory extends Component{

    render(){
        return (
            <Aux>

                <div>
                    <Card border="info" style={{ width: '18rem' }}>
                        <Card.Header>MEAT</Card.Header>
                        <Card.Body>
                        <Card.Title>Meat_in Canada</Card.Title>
                        <Card.Text>
                            Sirloin steak
                        </Card.Text>
                        <Button variant="primary">Add</Button>
                        </Card.Body>
                    </Card>
                </div>
            </Aux>
        );
    }
}

export default Inventory;
