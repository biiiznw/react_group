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
        // {item:'ITEM_CODE', quantity: 100},
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
            
            if (props.match.params.id){
                const res2 = await axios.get(`${props.apiUrl}/recipe/listWithItems/${props.match.params.id}`);
                if (res2 && res2.data && res2.data.error){
                    console.log('Error: ' + res2.data.error);
                } else if (res2 && res2.data){
                    // console.log('res->' + JSON.stringify(res.data));
                    setRecipe(res2.data.name);
                    setItems(res2.data.items.map(i => {
                        return {
                            item: i._id,
                            name: i.item.name,
                            quantity: i.quantity,
                            baseUnit: i.item.baseUnit,
                        }
                    }));
                }  
            }
        }
        fetchData();
        
    }, []);

    const onChange = (state, setState, e) => {
        e.preventDefault();
        setState(e.target.value);
    }

    const cancel = () => {
        props.history.goBack();
    }

    const deleteItem = (item) => {
        let temp = items.filter((i) => i.item._id !== item);
        setItems([...temp]);
    }
    const addItem = () => {
        let temp = itemsCombo.filter((i) => i._id == currentItemCombo)[0];
        //setItems([...items, {item:temp._id, baseUnit:temp.baseUnit, quantity: currentItemComboQty}]);
        setItems([...items, {item:temp._id, name: temp.name, baseUnit: temp.baseUnit, quantity: currentItemComboQty}]);
    }

    const saveRecipe = async (e) => {
        // setShowLoading(true);
        e.preventDefault();
        console.log('saving');
        // let newItems = items.map(i => i.item._id);

        const data = { name: recipe, items: items };
        
        let res;
        //const res = await axios.post(`${props.apiUrl}/recipe`, data);
        if (props.match.params.id){
            res = await axios.put(`${props.apiUrl}/recipe/${props.match.params.id}`, data);
        } else {
            res = await axios.post(`${props.apiUrl}/recipe`, data);
        }
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
                            {items && items.length > 0 ?
                                items.map((i, idx) => (
                                <tr key={idx}>
                                    <td>{idx}</td>
                                    <td>{i.name}</td>
                                    <td>{i.quantity}</td>
                                    <td>{i.baseUnit}</td>
                                    <td>
                                        <Button type="button" variant="primary" onClick={() => deleteItem(i._id)}>Delete</Button>
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
                &nbsp;
                <Button variant="primary" onClick={() => cancel()}>
                    Cancel
                </Button>
                </Form>
            </Jumbotron>
        </div>
       
    );

}

export default withRouter(RecipeAdd);