import { csrfFetch } from "./csrf"

const LOAD_SPOT_REVIEWS = '/spots/reviews/load'
const POST_SPOT_REVIEW = '/spots/reviews/post'
export const loadSpotReviewsActionCreator = (reviewsArr) => {
    return {
        type: LOAD_SPOT_REVIEWS,
        reviewsArr
    }
}

export const fetchSpotReviewsThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch(loadSpotReviewsActionCreator(data.Reviews))
        return data
    }
    return res
}

export const postSpotReviewActionCreator = (payload) => {
    return {
        type: POST_SPOT_REVIEW,
        payload
    }
}

export const postSpotReviewThunk = (reviewObj, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(reviewObj)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(postSpotReviewActionCreator(data))
        return data
    }
    return res
}

const initialState = {
    spot: {},
    user: {}
}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOT_REVIEWS:
            let newState = { ...state, spot: {} }
            action.reviewsArr.forEach((review) => {
                newState.spot[review.id] = review
            })
            return newState
        case POST_SPOT_REVIEW:
            return { ...state, spot: { ...state.spot, [action.payload.id]: action.payload } }
        default:
            return state;
    }
}

export default reviewsReducer
