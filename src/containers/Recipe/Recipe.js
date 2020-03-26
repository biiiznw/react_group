import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { withRouter } from 'react-router-dom';

import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


function recipt(props){

    return (
        <div>
        </div>
       
    );

}

export default withRouter(recipt, axios);