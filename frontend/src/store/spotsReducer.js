const LOAD_SPOTS = '/spots/load/all'
const LOAD_ONE_SPOT = '/spots/load/one'

export const loadSpotsActionCreator = (spotsArr) => {
    return {
        type: LOAD_SPOTS,
        spotsArr
    }
}

export const fetchSpotsThunk = () => async (dispatch) => {
    const res = await fetch('api/spots')

    if (res.ok) {
        const data = await res.json()
        dispatch(loadSpotsActionCreator(data.Spots))
        return data
    }
    return res
}

export const loadOneSpotActionCreator = (spotObj) => {
    return {
        type: LOAD_ONE_SPOT,
        spotObj
    }
}

export const fetchOneSpotThunk = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadOneSpotActionCreator(data))
        return data
    }
    return res
}

const initialState = {
    allSpots: {},
    singleSpot: {}
}
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            let newSpots = {}
            action.spotsArr.forEach(spot => {
                newSpots[spot.id] = spot
            });
            return { singleSpot: {}, allSpots: newSpots }
        case LOAD_ONE_SPOT:
            return { allSpots: { ...state.allSpots }, singleSpot: action.spotObj }
        default:
            return state;
    }
}

export default spotsReducer
