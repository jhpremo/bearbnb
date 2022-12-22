import React from 'react';
import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "./bearbnb-logo.png"
function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [searchTerm, setSearchTerm] = useState('')
    const [toggleAdvancedSearch, setToggleAdvancedSearch] = useState(false)
    const [pageSize, setPageSize] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const history = useHistory()

    const submitSearch = () => {

        let searchParams = new URLSearchParams()
        if (searchTerm) searchParams.append('q', searchTerm)
        if (minPrice) searchParams.append('minPrice', minPrice)
        if (maxPrice) searchParams.append('maxPrice', maxPrice)
        if (pageSize) searchParams.append('pageSize', Math.round(pageSize))

        setSearchTerm('')
        setMaxPrice('')
        setMinPrice('')
        setPageSize('')
        setToggleAdvancedSearch(false)
        if (searchParams.toString()) {
            history.push('/search?' + searchParams.toString())
        } else {
            history.push('/')
        }
    }

    const checkSubmit = (e) => {
        if (e.nativeEvent.code === "Enter") submitSearch()
    }

    // function to open advanced search drop down
    const openAdvancedSearch = () => {
        setToggleAdvancedSearch(!toggleAdvancedSearch)
    }

    let advancedSearchClass
    if (toggleAdvancedSearch) advancedSearchClass = 'navbar-advanced-search-dropdown-wrapper'
    else advancedSearchClass = 'navbar-hidden'

    return (
        <div className='nav-bar'>
            <NavLink exact to="/">
                <img className='logo' src={logo} alt='logo' />
            </NavLink>
            <div className='navbar-relative-wrapper'>
                <div className='navbar-search-wrapper'>
                    <input className="navbar-search-input" type='text' placeholder='Find your spot' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={checkSubmit}></input>
                    <button className='navbar-advanced-search-button' onClick={openAdvancedSearch}>
                        <i className="fa-solid fa-caret-down" />
                    </button>
                    <div className={advancedSearchClass}>
                        <div>
                            <label>Minimum price: </label>
                            <input className='navbar-advanced-search-dropdown-input' type='number' min='0' value={minPrice} onChange={(e) => setMinPrice(e.target.value)}></input>
                        </div>
                        <div>
                            <label>Maximum price: </label>
                            <input className='navbar-advanced-search-dropdown-input' type='number' min={`${minPrice}`} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}></input>
                        </div>
                    </div>
                    <button className='navbar-search-button' onClick={submitSearch}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </div>
            {isLoaded && <ProfileButton user={sessionUser} />}
        </div>


    );
}

export default Navigation;
