import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    FILTER_PRODUCT_REQUEST,
    FILTER_PRODUCT_SUCCESS,
    FILTER_PRODUCT_FAILURE,
    SORT_PRODUCT_REQUEST,
    SORT_PRODUCT_SUCCESS,
    SORT_PRODUCT_FAILURE,
} from './Action'

const initialState = {
    data: [],
    ifData: false,
    isLoading: false,
    query: "",
    error: "",
    totalProducts: 0,
    products: [],
    msg: ""

}

const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                query:action.query
            }

        case FETCH_PRODUCTS_SUCCESS:
            return {
                ifData: true,
                data: action.data
            }

        case FETCH_PRODUCTS_FAILURE:
            return {
                isLoading: false,
                data: state.data,
                error: action.error
            }

            //Add Product
        case ADD_PRODUCT_REQUEST:
            return {
            isLoading: true,
            error: false
            }

        case ADD_PRODUCT_SUCCESS:
            return {
            isLoading: false,
            msg: action.payload.message
            }

        case ADD_PRODUCT_FAILURE:
            return {
            isLoading: false,
            error: true
            }

        // Filter Product
        case FILTER_PRODUCT_REQUEST:
            return {
            isLoading: true,
            error: false
            }

        case FILTER_PRODUCT_SUCCESS:
            return {
            isLoading: false,
            data: action.payload,
            ifData: true
            }

        case FILTER_PRODUCT_FAILURE:
            return {
            isLoading: false,
            error: true
            }

        // Sort Product
        case SORT_PRODUCT_REQUEST:
            return {
            isLoading: true,
            error: false
            }

        case SORT_PRODUCT_SUCCESS:
            return {
            isLoading: false,
            data: action.payload,
            ifData: true
            }

        case SORT_PRODUCT_FAILURE:
            return {
            isLoading: false,
            error: true
            }
        
        default:
            return state
    }
}

export default productsReducer