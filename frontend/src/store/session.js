import { csrfFetch } from "./csrf"


const SET_USER = '/session/user/login'
const REMOVE_USER = '/session/user/logout'

export const setUserActionCreator = (userObj) => {
    return {
        type: SET_USER,
        userObj
    }
}

export const removeUserActionCreator = () => {
    return {
        type: REMOVE_USER
    }
}

export const loginUserThunk = (userObj) => async (dispatch) => {
    const { credential, password } = userObj
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    })

    if (res.ok) {
        const data = await res.json()
        await dispatch(setUserActionCreator(data.user))
        return data.user
    }
    return res
}


const sessionReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.userObj }
        case REMOVE_USER:
            return { ...state, user: null }
        default:
            return state;
    }
}

export default sessionReducer
