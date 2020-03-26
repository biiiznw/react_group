import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './components/Layout/Layout';
import Recipe from './containers/Recipe/Recipe';
import Logout from './containers/Auth/Logout/Logout';
import Sales from './containers/Sales/Sales'
import * as actions from './store/actions/index';

const Inventory = React.lazy(() => {
  return import('./containers/Inventory/Inventory');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

// const Sales = React.lazy(() => {
//   return import('./containers/Sales/Sales');
// });

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
        <Route path="/inventory" render={props => <Inventory {...props} />} />
        <Route render ={()=> < Logout />} path="/logout"/>
        <Route render ={()=> <Auth {...props} />} path="/auth"/>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(app)
);


// import React, { Component } from 'react';
// import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';

// import Layout from './components/Layout/Layout';
// import Recipe from './containers/Recipe/Recipe';
// import Inventory from './containers/Inventory/Inventory';
// import Sales from './containers/Sales/Sales';
// import Auth from './containers/Auth/Auth';
// import Logout from './containers/Auth/Logout/Logout';
// import * as actions from './store/actions/index';


// class App extends Component {

  

//   render() {

//     let routes = (
//       <Switch>
//         <Route path="/auth" render={props => <Auth {...props} />} />
//         <Redirect to="/" />
//       </Switch>
//     );
  
//     if (this.props.isAuthenticated) {
//       routes = (
//         <Switch>
//           <Route path="/" exact component={Recipe} />
//           <Route path="/sales" component={Sales} />
//           <Route path="/inventory" render={props => <Inventory {...props} />} />
//           <Route path="/logout" component={Logout} />
//           <Route path="/auth" render={props => <Auth {...props} />} />
//           <Redirect to="/" />
//         </Switch>
//       );
//     }


//     return (
//       <div>
//         <Layout>
//           {routes}
//         </Layout>
//       </div>
//     );
//   }
// }

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

// export default withRouter(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(App)
// );

