export const CONNECT = 'CONNECT';
import axios from 'axios';
import { encode as btoa } from 'base-64';
import { fetchToken } from './app';

export const connect = () => {
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
            axios('https://api.spotify.com/v1/playlists/1cUR3W6M4cjvbwKGolLC68', {
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

export const GET_PLAYLIST = 'GET_PLAYLIST';

export const getPlaylist = playlist => {
    return {
        type: GET_PLAYLIST,
        playlist,
    };
};
