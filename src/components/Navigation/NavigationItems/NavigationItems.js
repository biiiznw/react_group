import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Recipe</NavigationItem>
        <NavigationItem link="/sales">Sales</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/listitem">Inventory</NavigationItem>: null}
        {props.isAuthenticated ? <NavigationItem link="/list">Employees</NavigationItem>: null}
        { !props.isAuthenticated
            ? <NavigationItem link="/auth">LogIn</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;