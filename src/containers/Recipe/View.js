// import CreateItem from '../Inventory/createItem';
// import EditItem from '../Inventory/EditItem';
import React, { useState, useEffect } from 'react';
// import ListInventory from '../Inventory/ListInventory';
import Jumbotron from 'react-bootstrap/Jumbotron';
// import Spinner from 'react-bootstrap/Spinner';
// import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
//
import axios from 'axios';
//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  const apiUrl = 'http://localhost:3001';
  //
  var [recipes, setRecipes] = useState({});

//   const load_recipes = async () => {
//       //loading recipes
//       const res_recipes = await axios.get(apiUrl + '/recipe');
//       setRecipes(res_recipes);
//       //const recipes = await axios.get(apiUrl + '/recipe'); 
//   }


//   useEffect(() => {
//     load_recipes();
//     console.log("loading component view:");
//     console.log(props);
//   });

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
//   const createItem = () => {
//     console.log('in createItem')
//     setItem('y')

//   }
  //
  return (
    <div className="App">
      {recipes && recipes.items
        ? <Jumbotron>
            <h1>List of Recipe: </h1>
            
            <p>
              {/* <Button type="button" variant="primary" onClick={() => { createItem() }}>Create Item</Button>&nbsp;
              <Button type="button" variant="danger" onClick={() => { deleteCookie() }}>Log out</Button> */}
            </p>
            
            <ListGroup>
            {recipes.items.map((item, idx) => (
              <ListGroup.Item key={idx} >{item.itemName}</ListGroup.Item>
            ))}
          </ListGroup>
          </Jumbotron>      
        : 'NO RECIPE'
      }
    </div>
  );
}

//
export default View;