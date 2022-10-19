import EditSpotForm from "../components/EditSpotModal/EditSpotForm"
import { csrfFetch } from "./csrf"

const LOAD_SPOTS = '/spots/load/all'
const LOAD_ONE_SPOT = '/spots/load/one'
const POST_SPOT = '/spots/post'
const DELETE_SPOT = '/spots/delete'
const EDIT_SPOT = 'spots/edit'

const ADD_REVIEW = 'spots/reviews/add'
const SUBTRACT_REVIEW = 'spots/reviews/subtract'
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

export const editSpotActionCreator = (spotObj) => {
    return {
        type: EDIT_SPOT,
        spotObj
    }
}

export const editSpotThunk = (spotId, spotPayload) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify(spotPayload)
    })

    if (res.ok) {
        let data = await res.json()
        dispatch(editSpotActionCreator(data))
        return data
    }
    return res
}

export const deleteSpotActionCreator = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        let data = await res.json()
        dispatch(deleteSpotActionCreator(spotId))
        return data
    }
    return res
}

export const addSpotReviewActionCreator = (stars) => {
    return {
        type: ADD_REVIEW,
        stars
    }
}

export const subtractSpotReviewActionCreator = (stars) => {
    return {
        type: SUBTRACT_REVIEW,
        stars
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {}
}
const spotsReducer = (state = initialState, action) => {
    let total, newTotal, newNumReviews, newAvgStarRating
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
        case DELETE_SPOT:
            let newState = { ...state, allSpots: { ...state.allSpots } }
            delete newState[action.spotId]
            return newState
        case EDIT_SPOT:
            let newSingleSpot = { ...state.singleSpot, ...action.spotObj }
            newSingleSpot.Owner = { ...state.singleSpot.Owner }
            newSingleSpot.SpotImages = [...state.singleSpot.SpotImages]
            return { allSpots: { ...state.allSpots, [action.spotObj.id]: action.spotObj }, singleSpot: newSingleSpot }
        case ADD_REVIEW:
            total = state.singleSpot.avgStarRating * state.singleSpot.numReviews
            newTotal = total + action.stars
            newNumReviews = state.singleSpot.numReviews + 1
            newAvgStarRating = newTotal / newNumReviews
            return { ...state, singleSpot: { ...state.singleSpot, Owner: { ...state.singleSpot.Owner }, SpotImages: [...state.singleSpot.SpotImages], numReviews: newNumReviews, avgStarRating: newAvgStarRating } }
        case SUBTRACT_REVIEW:
            total = state.singleSpot.avgStarRating * state.singleSpot.numReviews
            newTotal = total - action.stars
            newNumReviews = state.singleSpot.numReviews - 1
            newAvgStarRating = newTotal / newNumReviews
            return { ...state, singleSpot: { ...state.singleSpot, Owner: { ...state.singleSpot.Owner }, SpotImages: [...state.singleSpot.SpotImages], numReviews: newNumReviews, avgStarRating: newAvgStarRating } }
        default:
            return state;
    }
}

export default spotsReducer
