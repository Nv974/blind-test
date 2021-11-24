import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Button,
} from 'react-native';

import { Audio } from 'expo-av';

import { useForm, Controller } from 'react-hook-form';

//redux
import { useSelector, useDispatch } from 'react-redux';
import * as appActions from '../store/actions/app';

const Play = () => {
    //vars
    const dispatch = useDispatch();

    //states locaux
    const [showTitleInput, setShowTitleInput] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    //states globaux
    const tracks = useSelector(state => state.api.tracks);
    const score = useSelector(state => state.app.score);
    const [sound, setSound] = useState();

    useEffect(() => {
        async function playSound() {
            console.log('Loading Sound');
            const { sound } = await Audio.Sound.createAsync({
                uri: tracks[currentIndex].track.preview_url,
            });
            setSound(sound);

            console.log('Playing Sound');
            await sound.playAsync();
        }
        playSound();
    }, []);

    // fonctionnalités react hook form
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // formate les caractères et espaces de l'api et des inputs
    // tout en minuscule / sans caractères spéciaux / sans espaces
    const formatData = data => {
        return data
            .replace(/[&\/\\#,+´’!()~%.'":*?<>{} ]/g, '')
            .replace(/[éèêëęėēÉÈÊËĘĖĒ€]/g, 'e')
            .replace(/[àâªæááäãåāÀÂªÆÁÄÃÅĀ]/g, 'a')
            .replace(/[îïìíįīÎÏÌÍĮĪ]/g, 'i')
            .replace(/[ôœºöòóõøōÔŒºÖÒÓÕÕØŌ]/g, 'o')
            .replace(/[ûùüúūÛÙÜÚŪ]/g, 'u')
            .replace(/[ÿŸ]/g, 'y')
            .replace(/[çćčÇĆČ]/g, 'c')
            .replace(/[ñń]/g, 'n')
            .replace(/[$]/g, 's')
            .toLowerCase();
    };

    // handlers
    const onSubmitArtistNameHandler = data => {
        console.log(data);
        setShowTitleInput(true);
        reset();

        let numberFound = 0;
        tracks[currentIndex].track.artists.forEach(artist =>
            formatData(artist.name) === formatData(data.artist)
                ? numberFound++
                : numberFound,
        );

        if (numberFound !== 0) {
            console.log("bravo c'est le nom de l'artiste");
            dispatch(appActions.setScore());
        } else {
            console.log("ce n'est pas le nom de l'artiste");
        }
    };

    const onSubmitTitleHandler = data => {
        console.log(data);
        reset();

        const formatedApiData = formatData(tracks[currentIndex].track.name);
        const formatedInputData = formatData(data.title);

        console.log(formatedApiData);

        if (formatedApiData === formatedInputData) {
            dispatch(appActions.setScore());
        } else {
            console.log("Ce n'est pas le bon titre");
        }
        setShowTitleInput(false);
        setCurrentIndex(currentIndex + 1);
        onChangeTrackHandler();
    };

    const onPressNext = () => {
        console.log('next');
        setShowTitleInput(!showTitleInput);

        if (showTitleInput) {
            setCurrentIndex(currentIndex + 1);
            onChangeTrackHandler();
        }
    };

    const onChangeTrackHandler = () => {
        console.log('change track');
        sound.stopAsync();
        playNext();
    };

    async function playNext() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync({
            uri: tracks[currentIndex + 1].track.preview_url,
        });
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    return (
        <View style={styles.container}>
            <Text> Score : {score}</Text>
            <Text> ARTISTE : {tracks[currentIndex].track.artists[0].name}</Text>
            <Text> TITRE : {tracks[currentIndex].track.name} </Text>
            <View>
                <Button title='PASSER' onPress={onPressNext} />
                <Text>{showTitleInput ? 'Titre du morceau' : "Nom de l'artiste"}</Text>
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
                                    onSubmitEditing={handleSubmit(onSubmitTitleHandler)}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
