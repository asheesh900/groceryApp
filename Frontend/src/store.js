import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import authReducer from './Redux/Authorization/Reducer'
import productsReducer from './Redux/Products/Reducer'
import categoryReducer from './Redux/Categories/Reducer'

const rootReducer = combineReducers({authReducer, productsReducer, categoryReducer })

const store = createStore(rootReducer,
    compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
export {store};