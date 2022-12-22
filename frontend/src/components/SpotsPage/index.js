import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchSessionSpotsThunk, fetchSpotsThunk } from '../../store/spotsReducer';
import SpotCard from './SpotCard';

function SpotsPage({ isSearch, isSession }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [query, setQuery] = useState({})
    const dispatch = useDispatch()
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);
    const spotsArr = useSelector((state) => Object.values(state.spots.allSpots))
    const history = useHistory()

    useEffect(() => {
        setIsLoaded(false)
        const query = {};
        const acceptedParams = new Set([
            "q",
            "minPrice",
            "maxPrice"
        ]);

        if (!isSession) {
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
        } else {
            if (!sessionUser) history.push('/')
            dispatch(fetchSessionSpotsThunk()).then(() => setIsLoaded(true))
        }
    }, [location, dispatch, isSearch, isSession])

    return (
        <>{isLoaded && <div className='spot-card-container'>
            <div className='spot-card-wrapper'>
                {spotsArr.map((spot) => {
                    return <SpotCard key={spot.id} spot={spot} />
                })}

            </div>
            {spotsArr.length < 1 && <div className='no-results'>No results found</div>}
        </div>}
        </>
    )
}

export default SpotsPage
