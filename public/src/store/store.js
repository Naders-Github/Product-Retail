import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reviewsReducer from '../reducers/reviewsReducer.js';
import productsReducer from '../reducers/productsReducer.js';
import questionsReducer from '../reducers/questionsReducer.js';

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const store = createStore(
  combineReducers({
    reviewsReducer,
    productsReducer,
    questionsReducer,
  }),
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;