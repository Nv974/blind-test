export const FETCH_TOKEN = 'FETCH_TOKEN';

export const fetchToken = token => {
    return {
        type: FETCH_TOKEN,
        token,
    };
};

export const SET_SCORE = 'SET_SCORE';

export const setScore = () => {
    return {
        type: SET_SCORE,
    };
};

export const SET_TRACK_RESULT = 'SET_TRACK_RESULT';

export const setTrackResult = obj => {
    return {
        type: SET_TRACK_RESULT,
        obj,
    };
};
