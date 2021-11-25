import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const Count = ({ time, setTime, killTime, setKillTime }) => {
    useEffect(() => {
        if (!killTime) {
            do {
                setTimeout(() => {
                    setTime(time - 1);
                }, 1000);
            } while (time === 0);
        }
    }, [killTime, time]);

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 33, color: 'white' }}> {time} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    status: {
        height: 20,
        backgroundColor: 'white',
    },
});

export default Count;
