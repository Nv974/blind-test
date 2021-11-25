import React from 'react';
import { View, Text, StyleSheet, Button, Image, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import datas from '../datas/results';

const Score = props => {
    const score = useSelector(state => state.app.score);
    const results = useSelector(state => state.app.tracksResult);

    return (
        <LinearGradient style={styles.container} colors={['#029FB8', '#7259F0']}>
            <FlatList
                style={styles.flatlist}
                ListHeaderComponent={() => (
                    <View style={styles.score}>
                        <Text style={styles.scoreText}> SCORE : {score} </Text>
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
                                {item.artist} - {item.title}
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
                ListFooterComponent={() => (
                    <Button
                        title='Home'
                        onPress={() => props.navigation.navigate('home')}
                    />
                )}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    score: {
        paddingLeft: 20,
        paddingTop: 40,
        marginBottom: 20,
        color: 'white',
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
        fontSize: 20,
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
