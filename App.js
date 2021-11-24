import React from 'react';

//Store
import reducer from './src/store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);
import { Provider } from 'react-redux';

import AppNavigator from './src/navigation/AppNavigator';
import Score from './src/screens/Score';

export default function App() {
    return (
        <Provider store={store}>
            <AppNavigator />
            {/* <Score /> */}
        </Provider>
    );
}
