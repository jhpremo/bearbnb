import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import CreateSpotFormModal from "../CreateSpotModel";
import './Navigation.css';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logoutThunk());
    };
    let dropDown
    if (user) {
        dropDown = (
            <>
                <div>{user.username}</div>
                <div>{user.email}</div>
                <CreateSpotFormModal />
                <button onClick={logout}>Log Out</button>
            </>
        )
    } else {
        dropDown = (
            <>
                <LoginFormModal />
                <SignupFormModal />
            </>
        )
    }

    let dropDownClass
    if (showMenu) {
        dropDownClass = "profile-dropdown"
    } else dropDownClass = 'hidden'

    return (
        <div className="profile-button-wrapper">
            <button id="profile-button" onClick={openMenu}>
                <i className="fa-solid fa-bars" />
                <span> </span>
                <i className="fas fa-user-circle" />
            </button>
            <div className={dropDownClass}>
                {dropDown}
            </div>
        </div>
    );
}

export default ProfileButton;
