import React from 'react';
import { View, Text } from 'react-native';

const Count = ({ time, setTime }) => {
    do {
        setTimeout(() => {
            setTime(time - 1);
        }, 1000);
    } while (time === -1);

    return (
        <View>
            <Text> {time} </Text>
        </View>
    );
};

export default Count;
