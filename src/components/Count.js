import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useSelector, useDispatch } from 'react-redux';
import * as appActions from '../store/actions/app';

const Count = ({ killTime }) => {
    const time = useSelector(state => state.app.time);
    const dispatch = useDispatch();

    useEffect(() => {
        /* si le jeu n'est pas en pause retirer 1 au temps toutes les secondes */
        if (!killTime) {
            do {
                setTimeout(() => {
                    dispatch(appActions.setTime());
                }, 1000);
            } while (time === 0);
        }
    }, [killTime, time]);

    // formatage chronomètre
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
