export const CONNECT = 'CONNECT';
import axios from 'axios';
import { encode as btoa } from 'base-64';
import { fetchToken } from './app';

// connexion a l'api + réccupérer la playlist
export const connect = id => {
    return dispatch => {
        axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization:
                    'Basic ' +
                    btoa(
                        'bb35bb76a40b4ece9e92e4c1479891ac:14cff7ae0d114441aef77d036c3766eb',
                    ),
            },
            data: 'grant_type=client_credentials',
            method: 'POST',
        }).then(tokenResponse => {
            dispatch(fetchToken(tokenResponse.data.access_token));
            axios('https://api.spotify.com/v1/playlists/' + id, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + tokenResponse.data.access_token,
                },
            })
                .then(response => {
                    dispatch(getPlaylist(response.data));
                })
                .catch(error => console.error(error));
        });
    };
};

// réccupération playlist
export const GET_PLAYLIST = 'GET_PLAYLIST';

export const getPlaylist = playlist => {
    return {
        type: GET_PLAYLIST,
        playlist,
    };
};

// vide la playlist
export const RESET_PLAYLIST = 'RESET_PLAYLIST';

export const resetPlaylist = () => {
    return {
        type: RESET_PLAYLIST,
    };
};

export const RESET_PLAYLIST_IS_LOADED = 'RESET_PLAYLIST_IS_LOADED';

export const resetPlaylistIsLoaded = () => {
    return {
        type: RESET_PLAYLIST_IS_LOADED,
    };
};
