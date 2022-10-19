import { csrfFetch } from "./csrf"

const LOAD_SPOT_REVIEWS = '/spots/reviews/load'
const POST_SPOT_REVIEW = '/spots/reviews/post'
const DELETE_REVIEW = '/review/delete'
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

export const deleteReviewActionCreator = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(deleteReviewActionCreator(reviewId))
    }
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
            let spotReviews = Object.values(state.spot)
            let prevSpotReviews = {}
            spotReviews.forEach((review) => prevSpotReviews[review.id] = review)
            prevSpotReviews[action.payload.id] = action.payload
            return { ...state, spot: prevSpotReviews }
        case DELETE_REVIEW:
            let newSpot = { ...state.spot }
            delete newSpot[action.reviewId]
            return { ...state, spot: newSpot }
        default:
            return state;
    }
}

export default reviewsReducer
