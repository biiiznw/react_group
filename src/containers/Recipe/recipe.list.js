// import CreateItem from '../Inventory/createItem';
// import EditItem from '../Inventory/EditItem';
import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
// import ListInventory from '../Inventory/ListInventory';
import Jumbotron from 'react-bootstrap/Jumbotron';
// import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import {Link} from 'react-router-dom'
//
import axios from 'axios';
//
function RecipeList (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  const apiUrl = 'http://localhost:3001';
//   const history = useHistory();
  //
  var [recipes, setRecipes] = useState([
    {
        name: "Recipe 1",
        items:[
            {item:'ITEM_CODE_1', qty_to_use:10},
            {item:'ITEM_CODE_2', qty_to_use:20},
        ]
    },
    {
        name: "Recipe 2",
        items:[
            {item:'ITEM_CODE_3', qty_to_use:15},
            {item:'ITEM_CODE_4', qty_to_use:25},
        ]
    }
]);

//   const load_recipes = async () => {
//       //loading recipes
//       const res_recipes = await axios.get(apiUrl + '/recipe');
//       setRecipes(res_recipes);
//       //const recipes = await axios.get(apiUrl + '/recipe'); 
//   }

//   const [item, setItem] = useState('');
//   // called when user clicks on Logout button
//   // to clear the cookie and set the screen state variable 
//   // back to its initial state.
//   const deleteCookie = async () => {
//     try {
//       await axios.get('/signout');
//       setScreen('auth');
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   // called when user clicks on Get Data button
//   // end-point demonstrates another example for the use
//   // of cookie specific response from the server.
//   const verifyCookie = async () => {
//     try {
//       const res = await axios.get('/welcome');
//       console.log(res.data)
//       setData(res.data);
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   //
//   const inventory = (email) => {
//     console.log('in items: ',email)
//   }
//   //
  const createRecipe = () => {
    // console.log('in createItem')
    // setItem('y')
    // history.push({
    //     pathname: '/recipes/add'
    // });
  }
  //

//   useEffect(() => {
    //     load_recipes();
    //     console.log("loading component view:");
    //     console.log(props);

// 
// });

  return (
    <div className="App">
      {recipes && recipes.length > 0
        ? <Jumbotron>
            <h1>Recipes: </h1>
            
            <p>
                {/* <Link to={"/recipes/add" + item._id} key={i}> */}
                <Link to={"/recipes/add"}>
                    <Button type="button" variant="primary">New</Button>
                </Link>
                {/* <Button type="button" variant="primary" onClick={() => { createRecipe() }}>New</Button>&nbsp; */}
            </p>
            
            <ListGroup>
            {recipes.map((recipe, idx) => (
              <ListGroup.Item key={idx} >{recipe.name}</ListGroup.Item>
            ))}
          </ListGroup>
          </Jumbotron>      
        : 'NO RECIPE'
      }
    </div>
  );
}

//
export default withRouter(RecipeList);