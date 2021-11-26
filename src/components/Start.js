import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { color } from 'react-native-reanimated';

const Start = () => {
    const [startTime, setStartTime] = useState(3);

    setTimeout(() => {
        if (startTime > 0) {
            setStartTime(startTime - 1);
        }
    }, 1000);

    return (
        <View style={styles.container}>
            {startTime > 0 ? (
                <View style={styles.wait}>
                    <Text style={styles.text}>{startTime}</Text>
                    <ActivityIndicator size='large' color='white' />
                </View>
            ) : (
                <Text style={styles.text}> C'est parti! </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wait: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'regular',
        color: 'white',
        fontSize: 30,
        marginBottom: 20,
    },
});

export default Start;
