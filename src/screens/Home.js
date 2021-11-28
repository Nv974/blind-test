import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//redux
import Logo from '../components/UI/Logo';
import { useDispatch } from 'react-redux';
import * as apiActions from '../store/actions/api';

const Home = props => {
    //vars

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(apiActions.resetPlaylist());
    }, [props.navigation]);

    return (
        <LinearGradient
            style={styles.container}
            // Background Linear Gradient
            colors={['#029FB8', '#7259F0']}
        >
            <Logo />

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.play}
                onPress={() => props.navigation.navigate('playlists')}
            >
                <Text style={{ color: '#029FB8', fontSize: 22, fontFamily: 'regular' }}>
                    Commencer
                </Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    play: {
        backgroundColor: 'white',
        padding: 10,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
});

export default Home;
