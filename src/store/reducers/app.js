import { FETCH_TOKEN, SET_SCORE, SET_TRACK_RESULT } from '../actions/app';

const initialState = {
    token: '',
    score: 0,
    currentSound: '',
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
                score: state.score + 10,
            };
        case SET_TRACK_RESULT:
            return {
                ...state,
                tracksResult: [...state.tracksResult, action.obj],
            };
        default:
            return state;
    }
};
