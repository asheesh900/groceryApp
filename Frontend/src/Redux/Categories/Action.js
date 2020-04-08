import axios from 'axios'

// ADD CATEGORY
export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST'
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS'
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE'


// GET CATEGORY
export const GET_CATEGORY_REQUEST = 'GET_CATEGORY_REQUEST'
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS'
export const GET_CATEGORY_FAILURE = 'GET_CATEGORY_FAILURE'


// add category action
export const addCategoryRequest = (payload) => ({
    type: ADD_CATEGORY_REQUEST,
    payload: payload
})

export const addCategorySuccess = (payload) => ({
    type: ADD_CATEGORY_SUCCESS,
    payload: payload
})

export const addCategoryFailure = (error) => ({
    type: ADD_CATEGORY_FAILURE,
    error: error
})

export const addCategory = (url, payload) => {
    return dispatch => {
        dispatch(addCategoryRequest());
        return axios
          .post(url, {...payload})
          .then(res => {
            alert(res.data.message)
            dispatch(addCategorySuccess(res.data.message));
          })
          .catch((err) => dispatch(addCategoryFailure(err)));
    };
}

// get category action
export const getCategoryRequest = (payload) => ({
  type: GET_CATEGORY_REQUEST,
  payload: payload
})

export const getCategorySuccess = (payload) => ({
  type: GET_CATEGORY_SUCCESS,
  payload: payload
})

export const getCategoryFailure = (error) => ({
  type: GET_CATEGORY_FAILURE,
  error: error
})

export const getCategories = (url) => {
  return dispatch => {
      dispatch(getCategoryRequest());
      return axios
        .get(url)
        .then(res => {
          console.log(res.data.categories)
          dispatch(getCategorySuccess(res.data.categories));
        })
        .catch((err) => dispatch(getCategoryFailure(err)));
  };
}

