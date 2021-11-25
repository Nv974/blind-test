import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import PlayScreen from '../screens/Play';
import ScoreScreen from '../screens/Score';

const Stack = createStackNavigator();

export const StackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name='home'
            component={HomeScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name='play'
            component={PlayScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name='score'
            component={ScoreScreen}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);
