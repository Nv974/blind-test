import React, { useEffect } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';

//redux
import * as apiActions from '../store/actions/api';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../components/UI/Logo';

const Home = props => {
    //vars
    const dispatch = useDispatch();
    const playlistLoaded = useSelector(state => state.api.playlistLoaded);

    //cycles de vies
    useEffect(() => {
        dispatch(apiActions.connect());
    }, []);
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
                onPress={() => playlistLoaded && props.navigation.navigate('play')}
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
