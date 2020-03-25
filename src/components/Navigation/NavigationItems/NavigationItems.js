import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Recipe</NavigationItem>
        <NavigationItem link="/">Login</NavigationItem>
        <NavigationItem link="/">Account</NavigationItem>
    </ul>
);

export default navigationItems;