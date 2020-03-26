import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import './App.css';

import Recipe from './containers/Recipe/Recipe';
import CreateItem from './containers/Inventory/createItem';
import CreateEmployee from './containers/Employee/CreateEmployee';
import EditItem from './containers/Inventory/EditItem';
import EditEmployee from './containers/Employee/EditEmployee';
import ListEmployee from './containers/Employee/ListEmployee';
import ShowEmployee from './containers/Employee/ShowEmployee';
import ShowItem from './containers/Inventory/ShowItem';
import Sales from './containers/Sales/Sales';
import Login from './containers/Auth/Login';
import ListItem from './containers/Inventory/ListItem';
import Logo from './components/image/home.png';

//
function App() {

  const Image= () => <div><img src={Logo} width="100%" height="auto" /></div>;

  return (
    <Router>
      <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
        <div class="container">
          <Link to="/recipe" className="navbar-brand">Recipe</Link>

          <button class="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">

              <li class="nav-item mx-0 mx-lg-1">
                <Link to="/sales" className="nav-link py-3 px-0 px-lg-3 rounded">Product</Link>
              </li>
              <li class="nav-item mx-0 mx-lg-1">
                <Link to="/login" className="nav-link py-3 px-0 px-lg-3 rounded">Login</Link>
              </li>
              <li class="nav-item mx-0 mx-lg-1">
                <Link to="/list" className="nav-link py-3 px-0 px-lg-3 rounded"> Employees </Link>
              </li>
              <li class="nav-item mx-0 mx-lg-1">
                <Link to="/listitem" className="nav-link py-3 px-0 px-lg-3 rounded"> Inventory </Link>
              </li>
              <li class="nav-item mx-0 mx-lg-1">
                <Link to="/create" className="nav-link py-3 px-0 px-lg-3 rounded"> Sign Up </Link>
              </li>
            
            </ul>
          </div>
        </div>
      </nav>

    
  <section class="page-section portfolio" id="portfolio">
    <div class="container">

      <div class="row">

        <div class="col-md-12">
          
    <div> 
        <Route render ={()=> < App/>} path="/" exact component={Image} />  
        <Route render ={()=> < Recipe />} path="/recipe" exact component={Image}/>
        <Route render ={()=> < Sales />} path="/sales"/>
        <Route render ={()=> < Login />} path="/login" />

        <Route render ={()=> < CreateEmployee />} path="/create"/>
        <Route render ={()=> < CreateItem />} path="/createitem"/>

        <Route render ={()=> < EditEmployee />} path="/edit/:id" />
        <Route render ={()=> < EditItem />} path="/edititem/:id" />

        <Route render ={()=> < ListEmployee />} path="/list"/>
        <Route render ={()=> < ListItem />} path="/listItem"/>

        <Route render ={()=> < ShowEmployee />} path="/show/:id"/>
        <Route render ={()=> < ShowItem />} path="/showitem/:id"/>

      </div>
        </div>


      </div>
     

    </div>
  </section>


     
    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;


// import React, { useEffect, Suspense } from 'react';
// import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// //import 'bootstrap/dist/css/bootstrap.min.css';

// import Layout from './components/Layout/Layout';
// import Recipe from './containers/Recipe/Recipe';
// import Logout from './containers/Auth/Logout/Logout';
// import CreateItem from './containers/Inventory/createItem';
// import CreateEmployee from './containers/Employee/CreateEmployee';
// import EditItem from './containers/Inventory/EditItem';
// import EditEmployee from './containers/Employee/EditEmployee';
// import ListEmployee from './containers/Employee/ListEmployee';
// import ShowEmployee from './containers/Employee/ShowEmployee';
// import ShowItem from './containers/Inventory/ShowItem';
// import Sales from './containers/Sales/Sales';
// import Login from './containers/Auth/Login';
// import ListItem from './containers/Inventory/ListItem';
// import * as actions from './store/actions/index';

// const Auth = React.lazy(() => {
//   return import('./containers/Auth/Auth');
// });


// const app = props => {
//   const { onTryAutoSignup } = props;

//   useEffect(() => {
//     onTryAutoSignup();
//   }, [onTryAutoSignup]);

//   let routes = (
//     <Switch>
//       <Route path="/auth" render={props => <Auth {...props} />} />
//       <Redirect to="/" />
//     </Switch>
//   );

//   if (props.isAuthenticated) {
//     routes = (
//       <Switch>
//         <Route render ={()=> < Recipe />} path="/" exact/>
//         <Route render ={()=> < Sales />} path="/sales"/>

//         <Route render ={()=> < CreateEmployee />} path="/create"/>
//         <Route render ={()=> < CreateItem />} path="/createitem"/>

//         <Route render ={()=> < EditEmployee />} path="/edit/:id" />
//         <Route render ={()=> < EditItem />} path="/edititem/:id" />

//         <Route render ={()=> < ListEmployee />} path="/list"/>
//         <Route render ={()=> < ListItem />} path="/listItem"/>

//         <Route render ={()=> < ShowEmployee />} path="/show/:id"/>
//         <Route render ={()=> < ShowItem />} path="/showitem/:id"/>

//         {/* <Route render ={()=> < Logout />} path="/logout"/> */}
//         <Route render ={()=> < Login />} path="/login" />

//         {/* <Route render ={()=> <Auth {...props} />} path="/auth"/> */}
//         <Redirect to="/" />
//       </Switch>
//     );
//   }
  
//   return (
//     <div>
//       <Layout>
//         <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
//       </Layout>
//     </div>
//   );
// };

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.token !== null
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignup: () => dispatch(actions.authCheckState())
//   };
// };

// // export default app;

// export default withRouter(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(app)
// );