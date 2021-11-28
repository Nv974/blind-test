import {
    FETCH_TOKEN,
    RESET_APP,
    SET_SCORE,
    SET_TIME,
    SET_TRACK_RESULT,
} from '../actions/app';

const initialState = {
    time: 10,
    token: '',
    score: 0,
    tracksResult: [],
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_TOKEN:
            return {
                ...state,
                token: action.token,
            };
        case SET_SCORE:
            return {
                ...state,
                score: state.score + action.score,
            };
        case SET_TRACK_RESULT:
            return {
                ...state,
                tracksResult: [...state.tracksResult, action.obj],
            };
        case SET_TIME:
            return {
                ...state,
                time: state.time - 1,
            };
        case RESET_APP:
            return {
                ...state,
                time: 120,
                score: 0,
                score: 0,
                tracksResult: [],
            };
        default:
            return state;
    }
};
