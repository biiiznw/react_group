import React from 'react';
import recipeLogo from '../../assets/images/recipe.png'
import classes from './Logo.css'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={recipeLogo} alt="Recipe"/>
    </div>

);
export default logo;