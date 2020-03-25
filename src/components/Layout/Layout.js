import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(layout);


// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import Aux from '../../hoc/Aux/Aux';
// import classes from './Layout.css';
// import Toolbar from '../Navigation/Toolbar/Toolbar';
// import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

// class Layout extends Component {
//     state = {
//         showSlideDrawer: false
//     }
//     sideDrawerClosedHandler = () => {
//         this.setState({showSlideDrawer:false});
//     }

//     sideDrawerToggleHandler = () =>{
//         this.setState((prevState) => {
//             return {showSlideDrawer:!this.state.showSlideDrawer};
//         });          
//     }

//     render (){
//         return (
//             <Aux>
//                 <Toolbar 
//                     isAuth={this.props.isAuthenticated}
//                     drawerToggleClicked={this.sideDrawerToggleHandler}/>
//                 <SideDrawer
//                     isAuth={this.props.isAuthenticated}
//                     open={this.state.showSlideDrawer}
//                     closed={this.sideDrawerClosedHandler}/>
//                 <main className={classes.Content}>
//                     {this.props.children}
//                 </main>
//             </Aux>
//         )
//     }
// }

// const mapStateToProps = state =>{
//     return {
//         isAuthenticated: state.auth.taken !== null
//     }
// }

// export default connect(mapStateToProps)(Layout);