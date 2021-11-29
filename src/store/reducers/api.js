import { GET_PLAYLIST, RESET_PLAYLIST, RESET_PLAYLIST_IS_LOADED } from '../actions/api';

const initialState = {
    playlist: [],
    tracks: [],
    playlistLoaded: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_PLAYLIST:
            const tracks = action.playlist.tracks.items;

            // renvoie les pistes de manière aléatoire
            function shuffleArray(inputArray) {
                inputArray.sort(() => Math.random() - 0.5);
            }

            shuffleArray(tracks);

            const tracksFilter = tracks.filter(item => item.track.preview_url);
            return {
                ...state,
                playlist: action.playlist,
                tracks: tracksFilter,
                playlistLoaded: true,
            };
        case RESET_PLAYLIST:
            return { ...state, playlist: [], tracks: [], playlistLoaded: false };
        case RESET_PLAYLIST_IS_LOADED:
            return { ...state, playlistLoaded: false };
        default:
            return state;
    }
};
