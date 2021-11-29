import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

const Start = props => {
    const [startTime, setStartTime] = useState(3);

    // compte à rebours avant de jouer 3 sec
    // + 2 secondes "c'est parti"
    setTimeout(() => {
        if (startTime > 0) {
            setStartTime(startTime - 1);
        }
    }, 1000);

    return (
        <View style={styles.container}>
            {startTime > 0 ? (
                <>
                    <View style={styles.preview}>
                        <Text style={styles.text}> {props.playlist.name} </Text>
                        <Image
                            source={{ uri: props.playlist.image }}
                            style={{ width: 200, height: 200 }}
                        />
                    </View>
                    <View style={styles.wait}>
                        <Text style={styles.text}>{startTime}</Text>
                        <ActivityIndicator size='large' color='white' />
                    </View>
                </>
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
    preview: {
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default Start;
