import { GET_PLAYLIST } from '../actions/api';

const initialState = {
    playlist: [],
    tracks: [],
    playlistLoaded: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_PLAYLIST:
            const tracks = action.playlist.tracks.items;
            const tracksFilter = tracks.filter(item => item.track.preview_url);
            return {
                ...state,
                playlist: action.playlist,
                tracks: tracksFilter,
                playlistLoaded: true,
            };
        default:
            return state;
    }
};
