import axios from 'axios'

// actions
const FETCH_REGISTER_REQUEST = "FETCH_REGISTER_REQUEST"
const FETCH_REGISTER_SUCCESS = "FETCH_REGISTER_SUCCESS"
const FETCH_REGISTER_FAILURE = "FETCH_REGISTER_FAILURE"
const LOGOUT = "LOGOUT"

// action creators
const fetchPostRequest = query => {
    return {
        type: FETCH_REGISTER_REQUEST,
        query: query || ""
    }
}

const fetchPostSuccess = data => {
    return {
        type: FETCH_REGISTER_SUCCESS,
        data: data
    }
}

const fetchPostFailure = error => {
    return {
        type: FETCH_REGISTER_FAILURE,
        error: error
    }
}

const logout = () => {
    return {
        type: LOGOUT
    }
}

// action to fetch the data
const registerUser = (payloadUserInfo, payloadUrl) => {
    return dispatch => {
        dispatch(fetchPostRequest)
        return axios
            .post(payloadUrl, payloadUserInfo)
            .then(res => {
                alert(res.data.message)
            })
            .catch(err => dispatch(fetchPostFailure(err)))
    }
}

const checkUser = (payloadUserCredential, payloadLoginUrl) => {
    return dispatch => {
        dispatch(fetchPostRequest)
        return axios
            .post(payloadLoginUrl, payloadUserCredential)
            .then(res => {
                alert(res.data.message)
                return dispatch(fetchPostSuccess(res.data))
            })
            .catch(err => dispatch(fetchPostFailure(err)))
    }
}


export {
    logout,
    checkUser,
    registerUser,
    fetchPostRequest,
    fetchPostSuccess,
    fetchPostFailure,
    FETCH_REGISTER_REQUEST,
    FETCH_REGISTER_SUCCESS,
    FETCH_REGISTER_FAILURE,
    LOGOUT
}