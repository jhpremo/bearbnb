import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "./bearbnb-logo.png"
function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='nav-bar'>
            <NavLink exact to="/">
                <img className='logo' src={logo} alt='logo' />
            </NavLink>
            {isLoaded && <ProfileButton user={sessionUser} />}
        </div>


    );
}

export default Navigation;
