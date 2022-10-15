const LOAD_SPOTS = '/spots/load/all'


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
            return { ...state, allSpots: newSpots }
        default:
            return state;
    }
}

export default spotsReducer
