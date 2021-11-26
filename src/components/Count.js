import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

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
            <CircularProgress
                value={time}
                maxValue={60}
                radius={35}
                textColor={'#ecf0f1'}
                activeStrokeColor={time < 10 ? '#e84118' : '#44bd32'}
                titleColor={'white'}
                duration={1000}
                titleStyle={{ fontWeight: 'bold' }}
                fontSize={25}
                activeStrokeWidth={5}
                inActiveStrokeWidth={4}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-end',
        padding: 20,
    },
    status: {
        height: 20,
        backgroundColor: 'white',
    },
});

export default Count;
