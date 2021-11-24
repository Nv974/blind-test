import { combineReducers } from 'redux';

import apiReducer from './api';
import appReducer from './app';

export default combineReducers({
    api: apiReducer,
    app: appReducer,
});
