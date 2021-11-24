import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Play = () => {
    const [isStarted, setisStarted] = useState(false);

    return (
        <View style={styles.container}>
            <Text> Play Component </Text>
            {!isStarted && <Button title='Play' onPress={() => setisStarted(true)} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default Play;
