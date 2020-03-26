import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './components/Layout/Layout';
import Recipe from './containers/Recipe/Recipe';
import Logout from './containers/Auth/Logout/Logout';
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
import * as actions from './store/actions/index';

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});


const app = props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route render ={()=> < Recipe />} path="/" exact/>
        <Route render ={()=> < Sales />} path="/sales"/>

        <Route render ={()=> < CreateEmployee />} path="/create"/>
        <Route render ={()=> < CreateItem />} path="/createitem"/>

        <Route render ={()=> < EditEmployee />} path="/edit/:id" />
        <Route render ={()=> < EditItem />} path="/edititem/:id" />

        <Route render ={()=> < ListEmployee />} path="/list"/>
        <Route render ={()=> < ListItem />} path="/listItem"/>

        <Route render ={()=> < ShowEmployee />} path="/show/:id"/>
        <Route render ={()=> < ShowItem />} path="/showitem/:id"/>

        {/* <Route render ={()=> < Logout />} path="/logout"/> */}
        <Route render ={()=> < Login />} path="/login" />

        {/* <Route render ={()=> <Auth {...props} />} path="/auth"/> */}
        <Redirect to="/" />
      </Switch>
    );
  }
  
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

// export default app;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(app)
);