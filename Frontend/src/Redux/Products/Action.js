import axios from 'axios'


// actions
const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST"
const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS"
const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE"

// action creators
const fetchGetRequest = query => {
    return {
        type: FETCH_PRODUCTS_REQUEST,
        query: query || ""
    }
}

const fetchGetSuccess = data => {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        data: data
    }
}

const fetchGetFailure = error => {
    return {
        type: FETCH_PRODUCTS_FAILURE,
        error: error
    }
}



// action to fetch the data

const getProducts = (payloadUrl) => {
    return dispatch => {
        dispatch(fetchGetRequest)
        return axios
            .get(payloadUrl)
            .then(res => {
                console.log(res.data)
                return dispatch(fetchGetSuccess(res.data))
            })
            .catch(err => dispatch(fetchGetFailure(err)))
    }
}

// Add Product
const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST'
const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS'
const ADD_PRODUCT_FAILURE = 'ADD_RPODUCT_FAILURE'

const addProductRequest = (payload) => ({
    type: ADD_PRODUCT_REQUEST,
    payload: payload
})

const addProductSuccess = (payload) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: payload
})

const addProductFailure = (error) => ({
    type: ADD_PRODUCT_FAILURE,
    error: error
})


const addProduct = (url, payload) => {
    return dispatch => {
        dispatch(addProductRequest());
        return axios
          .post(url, {...payload})
          .then(res => {
            alert(res.data.message)
            dispatch(addProductSuccess(res.data.message));
          })
          .catch((err) => dispatch(addProductFailure(err)));
    };
}

// Filter Product

const FILTER_PRODUCT_REQUEST = 'FILTER_PRODUCT_REQUEST'
const FILTER_PRODUCT_SUCCESS = 'FILTER_PRODUCT_SUCCESS'
const FILTER_PRODUCT_FAILURE = 'FILTER_PRODUCT_FAILURE'

const filterProductRequest = (payload) => ({
    type: FILTER_PRODUCT_REQUEST,
    payload: payload
  })
  
const filterProductSuccess = (payload) => ({
    type: FILTER_PRODUCT_SUCCESS,
    payload: payload
  })
  
const filterProductFailure = (error) => ({
    type: FILTER_PRODUCT_FAILURE,
    error: error
  })
  
  
const filterProduct = (url) => {
    return dispatch => {
        dispatch(filterProductRequest());
        return axios
          .get(url)
          .then(res => {
            // console.log(res.data.products)
            dispatch(filterProductSuccess(res.data));
          })
          .catch((err) => dispatch(filterProductFailure(err)));
    };
  }


  // Sort Product
const SORT_PRODUCT_REQUEST = 'SORT_PRODUCT_REQUEST'
const SORT_PRODUCT_SUCCESS = 'SORT_PRODUCT_SUCCESS'
const SORT_PRODUCT_FAILURE = 'SORT_PRODUCT_FAILURE'

const sortProductRequest = (payload) => ({
    type: SORT_PRODUCT_REQUEST,
    payload: payload
  })
  
  const sortProductSuccess = (payload) => ({
    type: SORT_PRODUCT_SUCCESS,
    payload: payload
  })
  
  const sortProductFailure = (error) => ({
    type: SORT_PRODUCT_FAILURE,
    error: error
  })
  
  
  const sortProducts = (url) => {
    return dispatch => {
        dispatch(sortProductRequest());
        return axios
          .get(url)
          .then(res => {
            // console.log(res.data)
            dispatch(sortProductSuccess(res.data));
          })
          .catch((err) => dispatch(sortProductFailure(err)));
    };
  }
  

export {
    sortProductRequest,
    sortProductSuccess,
    sortProducts,
    filterProductRequest,
    filterProductSuccess,
    filterProductFailure,
    filterProduct,
    addProductRequest,
    addProductSuccess,
    addProductFailure,
    addProduct,
    getProducts,
    fetchGetRequest,
    fetchGetSuccess,
    fetchGetFailure,
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
}