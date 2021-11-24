import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import PlayScreen from '../screens/Play';

const Stack = createStackNavigator();

export const StackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='home' component={HomeScreen} />
        <Stack.Screen name='play' component={PlayScreen} />
    </Stack.Navigator>
);
