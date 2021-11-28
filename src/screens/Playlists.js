import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//redux
import * as apiActions from '../store/actions/api';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

import playlists from '../datas/playlists';

const Playlists = props => {
    //vars
    const dispatch = useDispatch();
    const playlistLoaded = useSelector(state => state.api.playlistLoaded);

    const [playListSelected, setPlayListSelected] = useState();

    const onPressPlaylistHanlder = async item => {
        dispatch(apiActions.connect(item.id));
        setPlayListSelected(item);
    };
    useEffect(() => {
        if (playlistLoaded) {
            props.navigation.navigate('play', { playlist: playListSelected });
        }
    }, [playlistLoaded]);

    return (
        <LinearGradient
            style={styles.container}
            // Background Linear Gradient
            colors={['#029FB8', '#7259F0']}
        >
            <FlatList
                ListHeaderComponent={() => (
                    <Text style={styles.title}> Choisis un Playlist </Text>
                )}
                numColumns={2}
                data={playlists}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.playlist}>
                        <Text style={styles.playlistTitle}> {item.name} </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => onPressPlaylistHanlder(item)}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={styles.playlistImage}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontFamily: 'bold',
        marginBottom: 20,
        marginTop: 10,
        color: 'white',
        alignSelf: 'center',
    },
    play: {
        backgroundColor: 'white',
        padding: 10,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    playlistImage: {
        width: 150,
        height: 150,
    },
    playlist: {
        alignItems: 'center',
        margin: 10,
        marginBottom: 15,
    },
    playlistTitle: {
        fontFamily: 'regular',
        color: 'white',
        fontSize: 17,
        marginBottom: 5,
    },
});

export default Playlists;
