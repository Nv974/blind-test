import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';

//redux
import { useSelector, useDispatch } from 'react-redux';
import * as apiActions from '../store/actions/api';

const Play = () => {
    //vars
    const dispatch = useDispatch();

    //states locaux
    const [isStarted, setisStarted] = useState(false);
    const [showTitleInput, setShowTitleInput] = useState(false);

    //states globaux
    const tracks = useSelector(state => state.api.tracks);
    const playlistLoaded = useSelector(state => state.api.playlistLoaded);

    // cycles de vie
    useEffect(() => {
        dispatch(apiActions.connect());
    }, []);

    // fonctionnalités react hook form
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // handlers
    const onSubmitArtistNameHandler = data => {
        console.log(data);
        setShowTitleInput(true);
        reset();
    };

    const onSubmitTitleHandler = data => {
        console.log(data);
        setShowTitleInput(false);
        reset();
    };

    return !playlistLoaded ? (
        <ActivityIndicator size='large' />
    ) : (
        <View style={styles.container}>
            {!isStarted && <Button title='Play' onPress={() => setisStarted(true)} />}
            {isStarted && (
                <View>
                    <Text>
                        {showTitleInput ? 'Titre du morceau' : "Nom de l'artiste"}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginBottom: 20,
                        }}
                    >
                        {!showTitleInput ? (
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
                                        onSubmitEditing={handleSubmit(
                                            onSubmitArtistNameHandler,
                                        )}
                                    />
                                )}
                                rules={{ required: true }}
                                name='artist'
                            />
                        ) : (
                            <Controller
                                control={control}
                                render={({ value, field: { onChange } }) => (
                                    <TextInput
                                        style={styles.input}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        placeholder='Tapez le titre du morceau'
                                        multiline={false}
                                        autoFocus={true}
                                        autoCorrect={false}
                                        onSubmitEditing={handleSubmit(
                                            onSubmitTitleHandler,
                                        )}
                                    />
                                )}
                                rules={{ required: true }}
                                name='title'
                            />
                        )}

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.submit}
                            onPress={handleSubmit(
                                !showTitleInput
                                    ? onSubmitArtistNameHandler
                                    : onSubmitTitleHandler,
                            )}
                        >
                            <Text style={{ color: 'white' }}> OK </Text>
                        </TouchableOpacity>
                    </View>
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
        width: 250,
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
