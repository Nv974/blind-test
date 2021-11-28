import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    BackHandler,
    Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import * as appActions from '../store/actions/app';
import * as apiActions from '../store/actions/api';

import datas from '../datas/results';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Score = props => {
    const score = useSelector(state => state.app.score);
    const results = useSelector(state => state.app.tracksResult);

    const dispatch = useDispatch();

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Attention', 'Revenir aux playlists', [
                {
                    text: 'Annuler',
                    onPress: () => null,
                },
                {
                    text: 'Oui',
                    onPress: () => onPressBack(),
                },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [props.navigation]);

    const onPressBack = () => {
        dispatch(appActions.resetApp());
        dispatch(apiActions.resetPlaylistIsLoaded());
        props.navigation.navigate('playlists');
    };

    return (
        <LinearGradient style={styles.container} colors={['#029FB8', '#7259F0']}>
            <FlatList
                style={styles.flatlist}
                ListHeaderComponent={() => (
                    <View style={styles.header}>
                        <Text style={styles.scoreText}> SCORE : {score} </Text>
                        <TouchableOpacity onPress={onPressBack}>
                            <Ionicons name='play-back' color='white' size={30} />
                        </TouchableOpacity>
                    </View>
                )}
                data={results}
                keyExtractor={item => item.trackId}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={styles.informations}>
                            <Text style={styles.isFound}>
                                <Ionicons
                                    color={item.artistIsFound ? 'green' : 'red'}
                                    size={20}
                                    name={
                                        item.artistIsFound
                                            ? 'checkmark-outline'
                                            : 'close-outline'
                                    }
                                />
                            </Text>
                            <Text style={styles.informationsText}>
                                {item.artist.length + item.title.length > 33
                                    ? (item.artist + ' - ' + item.title).slice(0, 30) +
                                      ' ...'
                                    : item.artist + ' - ' + item.title}
                            </Text>
                            <Text style={styles.isFound}>
                                <Ionicons
                                    color={item.titleIsFound ? 'green' : 'red'}
                                    size={20}
                                    name={
                                        item.titleIsFound
                                            ? 'checkmark-outline'
                                            : 'close-outline'
                                    }
                                />
                            </Text>
                        </View>

                        <Image source={{ uri: item.image }} style={styles.image} />
                    </View>
                )}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingTop: 40,
        marginBottom: 20,
        color: 'white',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scoreText: {
        color: 'white',
        fontFamily: 'bold',
        fontSize: 25,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatlist: {
        width: '100%',
        marginHorizontal: '25%',
    },
    item: {
        marginVertical: 10,
    },

    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    },
    informations: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 300,
        alignSelf: 'center',
        height: 40,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    informationsText: {
        color: 'white',
        fontFamily: 'regular',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    isFound: {
        backgroundColor: 'white',
        width: 24,
        height: 24,
        borderRadius: 12,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export default Score;
