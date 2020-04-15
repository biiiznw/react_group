import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import './App.css';

import RecipeAdd from './containers/Recipe/recipe.add';
import RecipeList from './containers/Recipe/recipe.list';
import ItemList from './containers/Item/item.list';
import ItemAdd from './containers/Item/item.add';
import Login from './containers/Auth/Login';
// import { createBrowserHistory } from "history";
import Logo from './components/image/home.png';

//
function App(props) {

  const Image= () => <div><img src={Logo} width="100%" height="auto" /></div>;
//   const history = createBrowserHistory();
  const [token, setToken] = useState();

    // A wrapper for <Route> that redirects to the login
    // screen if you're not yet authenticated.
    function PrivateRoute({ children, ...rest }) {
        if (props.logout){
            setToken();
        }
        return (
        <Route
            {...rest}
            render={({ location }) =>
            token ? (
                children
            ) : (
                <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location }
                }}
                />
            )
            }
        />
        );
    }

    // function logout() {
    //     //setToken();
    // }

  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
        <div className="container">
          <Link to="/" className="navbar-brand">M.T.M.</Link>

          <button className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mx-0 mx-lg-1">
                <Link to="/recipes" className="nav-link py-3 px-0 px-lg-3 rounded" >Recipes</Link>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <Link to="/items" className="nav-link py-3 px-0 px-lg-3 rounded">Items</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    
  <section className="page-section portfolio" id="portfolio">
    <div className="container">

      <div className="row">

        <div className="col-md-12">
          
    <div> 
        <Route render ={()=> < App/>} path="/" exact component={Image} />  
        <PrivateRoute path="/recipes">
            <RecipeList />
        </PrivateRoute>
        {/* <Route render ={()=> < RecipeList />} exact path="/recipes"/> */}
        <Route render ={()=> < RecipeAdd />} exact path="/recipes/add"/>
        <Route render ={()=> < ItemList />} exact path="/items"/>
        <Route render ={()=> < ItemAdd />} exact path="/items/add"/>
        <Route render ={()=> < Login setToken={setToken} />} exact path="/login"/>
        {/* <Route render ={()=> < InventoryList />} exact path="/inventory"/> */}
        {/* <Route render ={()=> < Sales />} path="/sales"/>
        <Route render ={()=> < Login />} path="/login" />

        <Route render ={()=> < CreateEmployee />} path="/create"/>
        <Route render ={()=> < CreateItem />} path="/createitem"/>

        <Route render ={()=> < EditEmployee />} path="/edit/:id" />
        <Route render ={()=> < EditItem />} path="/edititem/:id" />

        <Route render ={()=> < ListEmployee />} path="/list"/>
        <Route render ={()=> < ListItem />} path="/listItem"/>

        <Route render ={()=> < ShowEmployee />} path="/show/:id"/>
        <Route render ={()=> < ShowItem />} path="/showitem/:id"/> */}

      </div>
        </div>


      </div>
     

    </div>
  </section>
     
    </Router>

    );
}
export default App;