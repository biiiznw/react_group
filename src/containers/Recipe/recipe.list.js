import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom'
import axios from 'axios';

function RecipeList (props) {
    let history = useHistory();
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  const [showAlert, setShowAlert] = useState();
  const [showModal, setShowModal] = useState();
  const [showModalResult, setShowModalResult] = useState();
  var [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`${props.apiUrl}/recipe`);
            if (res && res.data && res.data.error){
                console.log('Error: ' + res.data.error);
            } else if (res && res.data){
                // console.log('res->' + JSON.stringify(res.data));
                setRecipes(res.data);
            }  
        }
        fetchData();
    }, []);

    const clickEdit = (id) => {
        history.push(`/recipes/edit/${id}`);
    }

    const clickUse = (id) => {
        history.push(`/recipes/use/${id}`);
    }

    const clickDelete = (id) => {
        const deleteFn = async (id) => {
            console.log('delete:'+id);
            const res = await axios.delete(`${props.apiUrl}/recipe/${id}`);
            if (res && res.data && res.data.error){
                console.log('Error: ' + res.data.error);
            } else if (res && res.data){
                // console.log('res->' + JSON.stringify(res.data));
                setRecipes(recipes.filter(i => i._id != id));
                setShowAlert({tltle:'Success', message:'Recipe deleted!'});
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
    <div className="App">
        {drawAlert()}
        {drawModal()}
        <div>
            <h1>Recipes: </h1>
            <p>
                <Link to={"/recipes/add"}>
                    <Button type="button" variant="primary">New</Button>
                </Link>
            </p>
          <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {recipes && recipes.length > 0
                    ?
                    recipes.map((recipe, idx) => (
                        <tr key={idx}>
                        <td>{idx}</td>
                        <td>{recipe.name}</td>
                        <td>
                            <Button type="button" variant="primary" onClick={() => clickUse(recipe._id)}>Use</Button> &nbsp;
                            <Button type="button" variant="primary" onClick={() => clickEdit(recipe._id)}>Edit</Button> &nbsp;
                            <Button type="button" variant="primary" onClick={() => clickDelete(recipe._id)}>Delete</Button>
                        </td>
                        </tr>
                    ))
                    :
                    <tr><td colSpan={5}>NO RECIPES TO SHOW</td></tr>
                }
                  </tbody>
                </Table>
          </div>      
    </div>
  );
}

//
export default withRouter(RecipeList);