import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const Flash = () => {
    const toastConfig = {
        success: props => (
            <BaseToast
                {...props}
                style={{
                    borderLeftColor: '#009432',
                    width: 270,
                    position: 'absolute',
                    right: -90,
                }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: '#009432',
                    fontFamily: 'bold',
                }}
                text2Style={{
                    fontSize: 15,
                    fontWeight: '400',
                    fontFamily: 'regular',
                }}
            />
        ),

        error: props => (
            <ErrorToast
                {...props}
                text1Style={{
                    fontSize: 16,
                    color: '#e84118',
                    fontFamily: 'bold',
                }}
                text2Style={{
                    fontSize: 15,
                    fontFamily: 'regular',
                }}
                style={{
                    borderLeftColor: '#e84118',
                    width: 270,
                    position: 'absolute',
                    right: -90,
                    padding: 0,
                }}
            />
        ),
    };

    return <Toast config={toastConfig} />;
};

const styles = StyleSheet.create({
    container: {},
});

export default Flash;
