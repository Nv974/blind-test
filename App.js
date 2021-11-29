import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';

import { useFonts } from 'expo-font';

//Store
import reducer from './src/store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);
import { Provider } from 'react-redux';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
    const [loaded] = useFonts({
        regular: require('./assets/fonts/Ubuntu/Ubuntu-Regular.ttf'),
        bold: require('./assets/fonts/Ubuntu/Ubuntu-Bold.ttf'),
        medium: require('./assets/fonts/Ubuntu/Ubuntu-Medium.ttf'),
    });

    if (!loaded) {
        return <ActivityIndicator />;
    }
    return (
        <Provider store={store}>
            <AppNavigator />
            <StatusBar style='light' />
        </Provider>
    );
}
