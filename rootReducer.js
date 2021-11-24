import { combineReducers } from 'redux';

import trackReducer from './track';
import apiReducer from './api';
import appReducer from './app';

export default combineReducers({
    track: trackReducer,
    api: apiReducer,
    app: appReducer,
});
