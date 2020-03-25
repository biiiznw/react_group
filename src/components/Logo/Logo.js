import React from 'react';
import recipeLogo from '../../assets/images/recipe.png'
import classes from './Logo.css'

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={recipeLogo} alt="MyBurger" />
    </div>

);
export default logo;