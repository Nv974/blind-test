// réccupération token
export const FETCH_TOKEN = 'FETCH_TOKEN';

export const fetchToken = token => {
    return {
        type: FETCH_TOKEN,
        token,
    };
};

// modifie le score en fonction des réponses
export const SET_SCORE = 'SET_SCORE';

export const setScore = score => {
    return {
        type: SET_SCORE,
        score,
    };
};

// envoie l'objet indiquant le resulat de la question
// artiste et titre touvé ou pas etc...
export const SET_TRACK_RESULT = 'SET_TRACK_RESULT';

export const setTrackResult = obj => {
    return {
        type: SET_TRACK_RESULT,
        obj,
    };
};

// chronomètre
export const SET_TIME = 'SET_TIME';

export const setTime = () => {
    return {
        type: SET_TIME,
    };
};

// réinitialise l'app
export const RESET_APP = 'RESET_APP';

export const resetApp = () => {
    return {
        type: RESET_APP,
    };
};
