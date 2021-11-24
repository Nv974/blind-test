import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';

const Play = () => {
    const [isStarted, setisStarted] = useState(false);

    // fonctionnalités react hook form
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <View style={styles.container}>
            <Text> Play Component </Text>
            {!isStarted && <Button title='Play' onPress={() => setisStarted(true)} />}
            {isStarted && (
                <View
                    style={{
                        flexDirection: 'row',
                        marginBottom: 20,
                    }}
                >
                    <Controller
                        control={control}
                        render={({ value, field: { onChange } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={value => onChange(value)}
                                placeholder="Tapez le nom de l'artiste"
                                multiline={false}
                                autoFocus={true}
                                autoCorrect={false}
                                //onSubmitEditing={handleSubmit()}
                            />
                        )}
                        name='artist'
                    />

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.submit}
                        //onPress={handleSubmit())}
                    >
                        <Text style={{ color: 'white' }}> OK </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    input: {
        padding: 10,
        fontSize: 17,
        borderColor: 'black',
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        width: 200,
    },

    submit: {
        backgroundColor: 'black',
        width: 60,
        padding: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,

        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Play;
