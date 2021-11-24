import { FETCH_TOKEN, SET_SCORE } from '../actions/app';

const initialState = {
    token: '',
    score: 0,
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

        default:
            return state;
    }
};
