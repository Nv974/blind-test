import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const Count = ({ time, setTime, killTime }) => {
    useEffect(() => {
        if (!killTime) {
            do {
                setTimeout(() => {
                    setTime(time - 1);
                }, 1000);
            } while (time === 0);
        }
    }, [killTime, time]);

    const seconds = () => {
        if (time / 2 === 60 || time === 60 || time === 0) {
            return '00';
        } else if (time >= 70) {
            return time - 60;
        } else if (time < 70 && time > 60) {
            return '0' + (time - 60);
        } else if (time < 10) {
            return '0' + time;
        } else {
            return time;
        }
    };
    const minutes = Math.floor(time / 60);

    return (
        <View style={styles.container}>
            <CircularProgress
                value={time}
                maxValue={120}
                showProgressValue={false}
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
            <Text
                style={{
                    fontSize: 20,
                    position: 'absolute',
                    top: 42,
                    fontFamily: 'bold',
                    color: 'white',
                }}
            >
                {minutes > 0 && minutes + ':'}
                {seconds()}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        padding: 20,
    },
    status: {
        height: 20,
        backgroundColor: 'white',
    },
});

export default Count;
