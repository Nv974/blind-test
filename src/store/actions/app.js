export const FETCH_TOKEN = 'FETCH_TOKEN';

export const fetchToken = token => {
    return {
        type: FETCH_TOKEN,
        token,
    };
};

export const SET_SCORE = 'SET_SCORE';

export const setScore = score => {
    return {
        type: SET_SCORE,
        score,
    };
};

export const SET_TRACK_RESULT = 'SET_TRACK_RESULT';

export const setTrackResult = obj => {
    return {
        type: SET_TRACK_RESULT,
        obj,
    };
};

export const SET_TIME = 'SET_TIME';

export const setTime = () => {
    return {
        type: SET_TIME,
    };
};

export const RESET_APP = 'RESET_APP';

export const resetApp = () => {
    return {
        type: RESET_APP,
    };
};
