import {
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAILURE
  } from "./Action";
  
  const initialState = {
    isLoading: true,
    error: false,
    message: '',
    categories: []
  };
  
const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      // category
      case ADD_CATEGORY_REQUEST:
        return {
          isLoading: true,
          error: false
        }

      case ADD_CATEGORY_SUCCESS:
        return {
          isLoading: false,
          message: action.payload.message
        }

      case ADD_CATEGORY_FAILURE:
        return {
          isLoading: false,
          error: true
        }

      // get categorirs
      case GET_CATEGORY_REQUEST:
        return {
          isLoading: true,
          error: false
        }

      case GET_CATEGORY_SUCCESS:
        return {
          isLoading: false,
          message: action.payload.message,
          categories: action.payload
        }

      case GET_CATEGORY_FAILURE:
        return {
          isLoading: false,
          error: true
        }

      default:
        return state;
    }
};
  
  export default categoryReducer;