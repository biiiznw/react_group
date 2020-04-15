import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom'
import axios from 'axios';

function RecipeList (props) {
    let history = useHistory();
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();

  var [recipes, setRecipes] = useState([
    // {
    //     name: "Recipe 1",
    //     items:[
    //         {item:'ITEM_CODE_1', qty_to_use:10},
    //         {item:'ITEM_CODE_2', qty_to_use:20},
    //     ]
    // },
    // {
    //     name: "Recipe 2",
    //     items:[
    //         {item:'ITEM_CODE_3', qty_to_use:15},
    //         {item:'ITEM_CODE_4', qty_to_use:25},
    //     ]
    // }
]);

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

  return (
    <div className="App">
      {recipes && recipes.length > 0
        ? <div>
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
                    {recipes.map((recipe, idx) => (
                        <tr>
                        <td>{idx}</td>
                        <td>{recipe.name}</td>
                        <td>
                            <Button type="button" variant="primary">Use</Button> &nbsp;
                            <Button type="button" variant="primary" onClick={() => clickEdit(recipe._id)}>Edit</Button> &nbsp;
                            <Button type="button" variant="primary">Delete</Button>
                        </td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
          </div>      
        : 'NO RECIPE'
      }
    </div>
  );
}

//
export default withRouter(RecipeList);