import { csrfFetch } from "./csrf"

const LOAD_SPOT_BOOKINGS = "bookings/spots/load"

const loadSpotBookings = (bookingArr) => {
    return {
        type: LOAD_SPOT_BOOKINGS,
        bookingArr
    }
}

export const loadSpotBookingsThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadSpotBookings(data.Bookings))
        return data
    }
}

const LOAD_USER_BOOKINGS = "bookings/user/load"

const loadUserBookings = (bookingArr) => {
    return {
        type: LOAD_USER_BOOKINGS,
        bookingArr
    }
}

export const loadUserBookingsThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/current`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadUserBookings(data.Bookings))
        return data
    }
}

const DELETE_BOOKING = "booking/delete"

const deleteBooking = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        bookingId
    }
}

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    let res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        await dispatch(deleteBooking(bookingId))
    }
    return res
}

const initialState = {
    spotBookings: {},
    userBookings: {}
}

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOT_BOOKINGS:
            let newBookings = {}
            action.bookingArr.forEach(booking => {
                newBookings[booking.id] = booking
            });
            return { userBookings: {}, spotBookings: newBookings }
        case LOAD_USER_BOOKINGS:
            let newUserBookings = {}
            action.bookingArr.forEach(booking => {
                newUserBookings[booking.id] = booking
            });
            return { spotBookings: {}, userBookings: newUserBookings }
        case DELETE_BOOKING:
            let deletedSpotBookings = { ...state.spotBookings }
            let deletedUserBookings = { ...state.userBookings }
            delete deletedSpotBookings[action.bookingId]
            delete deletedUserBookings[action.bookingId]
            return { spotBookings: deletedSpotBookings, userBookings: deletedUserBookings }
        default:
            return state;
    }
}

export default bookingsReducer
