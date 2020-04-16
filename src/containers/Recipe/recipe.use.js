import React, {useState, useEffect} from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function RecipeUse(props){

    //select list
    //items chosen
    const [showAlert, setShowAlert] = useState();
    //items to save
    const [items, setItems] = useState([
        // {item:'ITEM_CODE', quantity: 100},
    ]);

    const [recipe, setRecipe] = useState();

    useEffect(() => {
        async function fetchData() {
            if (props.match.params.id){
                const res2 = await axios.get(`${props.apiUrl}/recipe/listWithItems/${props.match.params.id}`);
                if (res2 && res2.data && res2.data.error){
                    console.log('Error: ' + res2.data.error);
                } else if (res2 && res2.data){
                    // console.log('res->' + JSON.stringify(res.data));
                    setRecipe(res2.data.name);
                    setItems(res2.data.items.map(i => {
                        return {
                            item: i.item._id,
                            name: i.item.name,
                            quantity: i.quantity,
                            currentQty: i.item.quantity,
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

    const useRecipe = async (e) => {
        e.preventDefault();
        let use = true;
        items.forEach(i => {
            if (i.currentQty < i.quantity){
                setShowAlert({tltle:'Attention!', message:`This recipe cannot be used! Item:${i.name} Quantity: ${i.currentQty} < ${i.quantity} `});
                use = false;
            }
        })
        if (use){
            const data = { items: items };
            const res = await axios.post(`${props.apiUrl}/item/updateQtyByItems`, data);
            if (res && res.data && res.data.error){
                console.log('Error: ' + res.data.error);
            } else if (res && res.data){
                console.log('saved');
                console.log('res->' + res.data);
                props.history.goBack();
            }
        }
      };
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

    return (
        <div>
            {drawAlert()}
            <Jumbotron>
                <h1>Recipes: </h1>
                <Form onSubmit={useRecipe}>
                <Form.Group>
                    <Form.Label>Recipe Name</Form.Label>
                    <Form.Control type="text" name="recipe" id="recipe" placeholder="Enter recipe name" value={recipe} onChange={(e) => onChange(recipe, setRecipe, e)} readOnly/>
                </Form.Group>
                &nbsp;
                <Card>
                    <Card.Body>
                        <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Current Qty</th>
                            <th>Base Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items && items.length > 0 ?
                                items.map((i, idx) => (
                                <tr key={idx}>
                                    <td>{idx}</td>
                                    <td>{i.name}</td>
                                    <td>{i.quantity}</td>
                                    <td>{i.currentQty}</td>
                                    <td>{i.baseUnit}</td>
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
                    Use Recipe
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

export default withRouter(RecipeUse);