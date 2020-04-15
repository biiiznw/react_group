import React, {useState, useEffect} from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
// import { connect, useDispatch, useSelector } from 'react-redux';

import { withRouter } from 'react-router-dom';

// import Aux from '../../hoc/Aux/Aux';
// import Modal from '../../components/UI/Modal/Modal';

// import Spinner from '../../components/UI/Spinner/Spinner';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import * as actions from '../../store/actions/index';
// import axios from '../../axios-orders';


function RecipeAdd(props){

    //select list
    const [itemsCombo, setItemsCombo] = useState([
    ]);
    //items chosen
    const [currentItemCombo, setCurrentItemCombo] = useState('');
    const [currentItemComboQty, setCurrentItemComboQty] = useState('');
    //items to save
    const [items, setItems] = useState([
        // {name:'Item 1', base_unit:'kg', qty:100},
        // {name:'Item 2', base_unit:'g', qty:200},
    ]);

    const [recipe, setRecipe] = useState();

    let myInput;

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`${props.apiUrl}/item`);
            if (res && res.data && res.data.error){
                console.log('Error: ' + res.data.error);
            } else if (res && res.data){
                // console.log('res->' + JSON.stringify(res.data));
                setItemsCombo(res.data);
            }  
        }
        fetchData();
    }, []);

    const onChange = (state, setState, e) => {
        e.preventDefault();
        setState(e.target.value);
    }
    const deleteItem = (item) => {
        let temp = items.filter((i) => i._id !== item);
        setItems([...temp]);
    }
    const addItem = () => {
        // e.preventDefault();
        // setItems([...items, {[e.target.name]: e.target.value}]);
        console.log(itemsCombo);
        console.log(currentItemCombo);
        let temp = itemsCombo.filter((i) => i._id == currentItemCombo)[0];
        console.log(temp);
        setItems([...items, {...temp}]);
    }

    const saveRecipe = async (e) => {
        // setShowLoading(true);
        e.preventDefault();
        console.log('saving');
        let newItems = items.map(i => i._id);

        const data = { name: recipe, items: newItems };

        const res = await axios.post(`${props.apiUrl}/recipe`, data);
        // setShowLoading(false);
        //props.history.push('/item');
        if (res && res.data && res.data.error){
            console.log('Error: ' + res.data.error);
        } else if (res && res.data){
            console.log('saved');
            console.log('res->' + res.data);
            props.history.goBack();
        }
      };

    return (
        <div>
            <Jumbotron>
            <h1>Recipes: </h1>
                <Form onSubmit={saveRecipe}>
                <Form.Group>
                    <Form.Label>Recipe Name</Form.Label>
                    <Form.Control type="text" name="recipe" id="recipe" placeholder="Enter recipe name" value={recipe} onChange={(e) => onChange(recipe, setRecipe, e)} />
                </Form.Group>
                <Card>
                    <Card.Body>
                        <Form.Group>
                            <Form.Label>Item</Form.Label>
                            <Form.Control name="currentItemCombo" id="currentItemCombo" as="select" value={currentItemCombo}  onChange={(e) => onChange(currentItemCombo, setCurrentItemCombo, e)}>
                                <option></option>
                                {itemsCombo.map((item, idx) => (
                                    <option key={idx} value={item._id}>{item.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        {/* {currentItemCombo} */}
                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" name="currentItemComboQty" id="currentItemComboQty" placeholder="Enter item quantity" value={currentItemComboQty} onChange={(e) => onChange(currentItemComboQty, setCurrentItemComboQty, e)} />
                        </Form.Group>
                        {/* {currentItemComboQty} */}
                        <Form.Group>
                            <Button variant="primary" onClick={()=>addItem()}>
                                Add Item
                            </Button>
                        </Form.Group>
                    </Card.Body>
                </Card>
                &nbsp;
                <Card>
                    <Card.Body>
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
                                {/* <tr>
                                    <td>idx</td>
                                    <td>item.name</td>
                                    <td>item.quantity</td>
                                    <td>item.baseUnit</td>
                                    <td>
                                        <Button type="button" variant="primary">Delete</Button>
                                    </td>
                                </tr> */}
                            {items && items.length > 0 ?
                                items.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{idx}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.baseUnit}</td>
                                    <td>
                                        <Button type="button" variant="primary" onClick={() => deleteItem(item._id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))
                            : <tr><td colSpan="5">NO ITEMS</td></tr>
                            }
                        </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                <br/>
                <Button variant="primary" type="submit">
                    Save
                </Button>
                </Form>
            </Jumbotron>
        </div>
       
    );

}

export default withRouter(RecipeAdd);