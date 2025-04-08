import {createStore} from 'redux';
import useReducer from './useReducer';

const store = createStore(useReducer);

export default store;