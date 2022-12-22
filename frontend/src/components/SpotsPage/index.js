import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchSpotsThunk } from '../../store/spotsReducer';
import SpotCard from './SpotCard';

function SpotsPage({ isSearch }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [query, setQuery] = useState({})
    const dispatch = useDispatch()
    const location = useLocation();

    const spotsArr = useSelector((state) => Object.values(state.spots.allSpots))

    useEffect(() => {
        setIsLoaded(false)
        const query = {};
        const acceptedParams = new Set([
            "q",
            "minPrice",
            "maxPrice"
        ]);

        if (isSearch) {
            const params = new URLSearchParams(location.search)

            for (let [key, val] of params) {
                if (acceptedParams.has(key)) {
                    if (key !== 'q') {
                        query[key] = Number(val)

                    } else {
                        query[key] = val
                    }
                }
            }
            setQuery(query)
        }

        dispatch(fetchSpotsThunk(query)).then(() => setIsLoaded(true))

    }, [location, dispatch, isSearch])

    if (!spotsArr) return <></>
    return (
        <div className='spot-card-container'>
            <div className='spot-card-wrapper'>
                {spotsArr.map((spot) => {
                    return <SpotCard key={spot.id} spot={spot} />
                })}
            </div>
        </div>
    )
}

export default SpotsPage
