import React from 'react';
import { View, StyleSheet, Image, Platform } from 'react-native';

const Logo = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 30,
        right: 30,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 15,
    },
});

export default Logo;
