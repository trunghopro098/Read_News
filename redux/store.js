import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { UserReducer} from './reducer';

const rootReducer = combineReducers({
    UserReducer,
});


const store = configureStore({
    reducer:rootReducer
})

export default store;