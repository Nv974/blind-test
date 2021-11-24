import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigator } from './Navigators';
import { NavigationContainer } from '@react-navigation/native';

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default AppNavigator;
