import { csrfFetch } from "./csrf"

const LOAD_SPOTS = '/spots/load/all'
const LOAD_ONE_SPOT = '/spots/load/one'
const POST_SPOT = '/spots/post'

export const loadSpotsActionCreator = (spotsArr) => {
    return {
        type: LOAD_SPOTS,
        spotsArr
    }
}

export const fetchSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('api/spots')

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
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadOneSpotActionCreator(data))
        return data
    }
    return res
}

export const postSpotActionCreator = (spotObj) => {
    return {
        type: POST_SPOT,
        spotObj
    }
}

export const writeSpotThunk = (spotPayload, previewImageUrl, imageUrlsArr) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spotPayload)
    })

    if (res.ok) {
        let data = await res.json()
        dispatch(postSpotActionCreator(data))
        // post preview image
        console.log('preview image' + previewImageUrl)
        await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            body: JSON.stringify({
                url: previewImageUrl,
                preview: true
            })
        })
        //iterate through other image urls and post each one
        for (let i = 0; i < imageUrlsArr.length; i++) {
            console.log('image number' + i)
            await csrfFetch(`/api/spots/${data.id}/images`, {
                method: 'POST',
                body: JSON.stringify({
                    url: imageUrlsArr[i],
                    preview: false
                })
            })
        }
        return data.id
    }
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
        case POST_SPOT:
            return { ...state, allSpots: { ...state.allSpots, [action.spotObj.id]: action.spotObj } }
        default:
            return state;
    }
}

export default spotsReducer
