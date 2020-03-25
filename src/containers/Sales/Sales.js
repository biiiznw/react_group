import React from 'react';
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom';


import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';

function Sales(props){
    return (
        <div>
            <h2> Create an Course </h2>
        </div>
    );
}
export default withRouter(Sales);