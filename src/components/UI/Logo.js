import React from 'react';
import { View, StyleSheet, Image, Platform, Text } from 'react-native';

const Logo = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}> BLIND TEST </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontFamily: 'bold',
        color: 'white',
        fontSize: 30,
    },
});

export default Logo;
