import {
    FETCH_REGISTER_REQUEST,
    FETCH_REGISTER_SUCCESS,
    FETCH_REGISTER_FAILURE,
    LOGOUT
} from './Action'

const initialState = {
    isLoading: false,
    query: "",
    ifToken: "",
    isLogin: false,
    login_response: [],
    error: ""


}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                query:action.query
            }

        case FETCH_REGISTER_SUCCESS:
            const loginResponse = JSON.stringify(action.data)
            localStorage.setItem("loginResponse", loginResponse)
            if(action.data.message === "Signin Successful!") {
                return {
                    isLoading: false,
                    data: action.data,
                    error: state.error,
                    ifToken: action.data.token,
                    isLogin: true,
                }
            } else {
                return {
                    isLoading: false,
                    data: action.data,
                    error: state.error,
                }
            }

        case FETCH_REGISTER_FAILURE:
            return {
                isLoading: false,
                data: state.data,
                error: action.error
            }
        
        case LOGOUT:
            return {
                ifToken: ""
            }

        default:
            return state
    }
}

export default authReducer