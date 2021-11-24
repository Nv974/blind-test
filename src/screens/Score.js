import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import datas from '../datas/results';

const Score = props => {
    const score = useSelector(state => state.app.score);
    const results = useSelector(state => state.app.tracksResult);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.flatlist}
                ListHeaderComponent={() => (
                    <View style={styles.score}>
                        <Text> SCORE : {score} </Text>
                    </View>
                )}
                data={datas}
                keyExtractor={item => item.trackId}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ color: item.artistIsFound ? 'green' : 'red' }}>
                                {item.artist} -{' '}
                            </Text>
                            <Text style={{ color: item.titleIsFound ? 'green' : 'red' }}>
                                {item.title}
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    score: {
        paddingLeft: 20,
        paddingTop: 40,
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
});

export default Score;
