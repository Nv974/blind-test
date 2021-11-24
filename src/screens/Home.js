import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';

//redux
import * as apiActions from '../store/actions/api';
import { useSelector, useDispatch } from 'react-redux';

const Home = props => {
    //vars
    const dispatch = useDispatch();
    const playlistLoaded = useSelector(state => state.api.playlistLoaded);

    //cycles de vies
    useEffect(() => {
        dispatch(apiActions.connect());
    }, []);
    return (
        <View style={styles.container}>
            <Button title='Play' onPress={() => props.navigation.navigate('play')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Home;
