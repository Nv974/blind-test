import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
    ActivityIndicator,
    Button,
    Alert,
    BackHandler,
} from 'react-native';
import { Audio } from 'expo-av';
import { useForm, Controller } from 'react-hook-form';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

//redux
import { useSelector, useDispatch } from 'react-redux';
import * as appActions from '../store/actions/app';
import * as apiActions from '../store/actions/api';

//constants
import Colors from '../constants/Colors';

//components
import Count from '../components/Count';
import Start from '../components/Start';
import { useBackHandler } from '@react-native-community/hooks';
import playlists from '../datas/playlists';
import { set } from 'react-native-reanimated';

const Play = props => {
    //vars
    const dispatch = useDispatch();

    //states locaux
    const [showTitleInput, setShowTitleInput] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sound, setSound] = useState();
    const [breakPoint, setbreakPoint] = useState(90);
    const [artistIsFound, setArtistIsFound] = useState(false);
    const [killTime, setKillTime] = useState(false);
    const [error, setError] = useState(2);
    const [start, setStart] = useState(false);

    //states globaux
    const tracks = useSelector(state => state.api.tracks);
    const score = useSelector(state => state.app.score);
    const time = useSelector(state => state.app.time);

    //params
    const playlist = props.route.params.playlist;

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

        setTimeout(() => {
            setStart(true);
            playSound();
        }, 5000);
    }, []);

    // changement automatique quand la piste
    // à été écoutée + de 30 sec
    useEffect(() => {
        if (time === breakPoint) {
            if (time > 30) {
                setbreakPoint(time - 30);
            }
            onChangeTrackHandler();
            dispatch(appActions.setTrackResult(trackResult(false)));
            setShowTitleInput(false);
            setCurrentIndex(currentIndex + 1);
        } else if (time === 0) {
            sound.stopAsync();
            sound.unloadAsync();
            dispatch(appActions.setTrackResult(trackResult(false)));
            props.navigation.navigate('score');
        }
    }, [time]);

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
            .replace(/ *\([^)]*\) */g, '')
            .replace(/[&\/\\#,+´’!()~%.'":*?<>{} ]/g, '')
            .replace(/[-]/g, '')
            .replace(/[éèêëęėēÉÈÊËĘĖĒ€]/g, 'e')
            .replace(/[àâªæááäãåāÀÂªÆÁÄÃÅĀ]/g, 'a')
            .replace(/[îïìíįīÎÏÌÍĮĪ]/g, 'i')
            .replace(/[ôœºöòóõøōÔŒºÖÒÓÕÕØŌ]/g, 'o')
            .replace(/[ûùüúūÛÙÜÚŪ]/g, 'u')
            .replace(/[ÿŸ]/g, 'y')
            .replace(/[çćčÇĆČ]/g, 'c')
            .replace(/[ñń]/g, 'n')
            .replace(/[$]/g, 's')
            .replace(/[the\\The\\THE]/g, '')
            .toLowerCase();
    };

    function trackResult(titleIsFound) {
        const trackObj = {
            trackId: tracks[currentIndex].track.id,
            artist: tracks[currentIndex].track.artists[0].name,
            title: tracks[currentIndex].track.name,
            artistIsFound: artistIsFound,
            image: tracks[currentIndex].track.album.images[0].url,
            titleIsFound,
        };

        return trackObj;
    }

    // handlers
    const onSubmitArtistNameHandler = data => {
        console.log(data);
        if (data.artist !== undefined && !killTime) {
            reset();

            let numberFound = 0;

            // il faut trouvé au moins un artiste du morceau
            tracks[currentIndex].track.artists.forEach(artist =>
                formatData(artist.name) === formatData(data.artist)
                    ? numberFound++
                    : numberFound,
            );

            if (numberFound !== 0) {
                const artistName = tracks[currentIndex].track.artists[0].name;
                showSuccess(artistName);
                dispatch(appActions.setScore(10));
                setArtistIsFound(true);
                setShowTitleInput(true);
                setError(2);
            } else {
                showError();
                if (error > 1) {
                    setError(error - 1);
                } else {
                    setArtistIsFound(false);
                    setShowTitleInput(true);
                    setError(2);
                    dispatch(appActions.setScore(-5));
                }
            }
        } else {
            setArtistIsFound(false);
            setShowTitleInput(true);
            setError(2);
            dispatch(appActions.setScore(-5));
        }
    };

    const onSubmitTitleHandler = (data, currentTime) => {
        if (data.title !== undefined) {
            reset();
            const formatedApiData = formatData(tracks[currentIndex].track.name);
            const formatedInputData = formatData(data.title);
            if (formatedApiData.replace(/ *\([^)]*\) */g, '') === formatedInputData) {
                dispatch(appActions.setScore(10));
                dispatch(appActions.setTrackResult(trackResult(true)));
                currentTime = time;
                setbreakPoint(currentTime - 30);
                showSuccess(tracks[currentIndex].track.name);
                setShowTitleInput(false);
                setCurrentIndex(currentIndex + 1);
                onChangeTrackHandler();
                setError(2);
            } else {
                if (error > 1) {
                    showError();
                    setError(error - 1);
                } else {
                    showError();
                    dispatch(appActions.setTrackResult(trackResult(false)));
                    setShowTitleInput(false);
                    setError(2);
                    currentTime = time;
                    setbreakPoint(currentTime - 30);
                    setShowTitleInput(false);
                    setCurrentIndex(currentIndex + 1);
                    onChangeTrackHandler();
                    dispatch(appActions.setScore(-5));
                }
            }
        } else {
            dispatch(appActions.setTrackResult(trackResult(false)));
            currentTime = time;
            setbreakPoint(currentTime - 30);
            setShowTitleInput(false);
            setCurrentIndex(currentIndex + 1);
            onChangeTrackHandler();
            setError(2);
            dispatch(appActions.setScore(-5));
        }
    };

    const onChangeTrackHandler = () => {
        setKillTime(true);
        setError(2);

        setTimeout(() => {
            sound.stopAsync();
            playNext(currentIndex);
            setCurrentIndex(currentIndex + 1);
        }, 5000);

        console.log('change track');
    };

    async function playNext() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync({
            uri: tracks[currentIndex + 1].track.preview_url,
        });
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
        setKillTime(false);
    }

    //toast
    const showSuccess = value => {
        Toast.show({
            type: 'success',
            text1: 'Bonne réponse',
            text2: "Il s'agit de " + value,
            visibilityTime: 2000,
        });
    };

    const showError = () => {
        Toast.show({
            type: 'error',
            text1: error > 1 ? 'Attention!' : 'Dommage!',
            text2:
                error > 1 ? 'Il vous reste une chance' : "Ce n'est pas la bonne réponse",
            visibilityTime: 2000,
        });
    };

    // BackHandler.addListener('hardwareBackPress', quitGame);

    // async function quitGame() {
    //     Alert.alert('Attention', 'Êtes-vous sûr de vouloir quitter cette partie ?', [
    //         {
    //             text: 'Annuler',
    //             onPress: () => null,
    //         },
    //         {
    //             text: 'Oui',
    //             onPress: async () => {
    //                 await sound.stopAsync();
    //                 sound.unloadAsync();
    //                 dispatch(appActions.resetApp());
    //                 dispatch(apiActions.resetPlaylistIsLoaded());
    //                 props.navigation.navigate('home');
    //             },
    //         },
    //     ]);
    // }

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Attention', 'Êtes-vous sûr de vouloir quitter cette partie ?', [
                {
                    text: 'Annuler',
                    onPress: () => null,
                },
                {
                    text: 'Oui',
                    onPress: async () => {
                        await sound.stopAsync();
                        sound.unloadAsync();
                        dispatch(appActions.resetApp());
                        dispatch(apiActions.resetPlaylistIsLoaded());
                        props.navigation.navigate('home');
                    },
                },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [sound, props.navigation]);

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

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <LinearGradient colors={['#029FB8', '#7259F0']} style={styles.container}>
                {start ? (
                    <>
                        {time > 0 && (
                            <Count killTime={killTime} setKillTime={setKillTime} />
                        )}
                        <Toast config={toastConfig} />
                        <View>
                            <Text style={styles.score}>Score : {score}</Text>
                        </View>
                        <ImageBackground
                            source={{
                                uri: !killTime
                                    ? tracks[currentIndex].track.album.images[0].url
                                    : tracks[currentIndex - 1].track.album.images[0].url,
                            }}
                            style={{
                                width: 200,
                                height: 200,
                                flexDirection: 'column-reverse',
                            }}
                            blurRadius={killTime ? 0 : 40}
                            borderRadius={7}
                        >
                            <View>
                                {!killTime && (
                                    <Text
                                        style={
                                            showTitleInput
                                                ? styles.label
                                                : {
                                                      ...styles.label,
                                                      backgroundColor:
                                                          'rgba(0, 185, 121, 0.7)',
                                                  }
                                        }
                                    >
                                        {showTitleInput
                                            ? 'Titre du morceau'
                                            : "Nom de l'artiste"}
                                    </Text>
                                )}
                            </View>
                            {!killTime && (
                                <View style={styles.question}>
                                    <Text>
                                        <Ionicons
                                            name='help-outline'
                                            size={50}
                                            color='white'
                                        />
                                    </Text>
                                </View>
                            )}
                        </ImageBackground>
                        <Text style={styles.artist}>
                            {artistIsFound &&
                                showTitleInput &&
                                tracks[currentIndex].track.artists[0].name}
                            {killTime &&
                            tracks[currentIndex - 1].track.artists[0].name.length +
                                tracks[currentIndex - 1].track.name.length >
                                33
                                ? (
                                      tracks[currentIndex - 1].track.artists[0].name +
                                      ' - ' +
                                      tracks[currentIndex - 1].track.name
                                  ).slice(0, 30) + ' ...'
                                : killTime &&
                                  tracks[currentIndex - 1].track.artists[0].name +
                                      ' - ' +
                                      tracks[currentIndex - 1].track.name}
                        </Text>
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginBottom: 40,
                                }}
                            >
                                {!showTitleInput ? (
                                    <Controller
                                        control={control}
                                        render={({ value, field: { onChange } }) => (
                                            <TextInput
                                                style={styles.input}
                                                value={value}
                                                onChangeText={value => {
                                                    onChange(value);
                                                }}
                                                placeholder="Tapez le nom de l'artiste"
                                                multiline={false}
                                                autoFocus={true}
                                                autoCorrect={false}
                                                onSubmitEditing={handleSubmit(
                                                    onSubmitArtistNameHandler,
                                                )}
                                                onFocus={() => reset()}
                                            />
                                        )}
                                        rules={{ required: false }}
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
                                                defaultValue=''
                                                autoFocus={true}
                                                autoCorrect={false}
                                                autoComplete='off'
                                                onSubmitEditing={handleSubmit(
                                                    onSubmitTitleHandler,
                                                )}
                                            />
                                        )}
                                        rules={{ required: false }}
                                        name='title'
                                    />
                                )}

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.submit}
                                    onPress={
                                        !killTime
                                            ? handleSubmit(
                                                  !showTitleInput
                                                      ? onSubmitArtistNameHandler
                                                      : onSubmitTitleHandler,
                                              )
                                            : () => console.log('un instant')
                                    }
                                >
                                    <Text style={{ color: 'white' }}>
                                        {killTime ? (
                                            <ActivityIndicator color='white' />
                                        ) : (
                                            <Ionicons
                                                name='checkmark-outline'
                                                color='white'
                                                size={32}
                                            />
                                        )}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                ) : (
                    <Start playlist={playlist} />
                )}
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.primary,
    },
    input: {
        padding: 10,
        fontSize: 17,
        borderColor: 'black',
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        width: 250,
        backgroundColor: '#f5f6fa',
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
    label: {
        fontSize: 22,
        color: 'white',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 121, 185, 0.7)',
        width: '100%',
        textAlign: 'center',
        fontFamily: 'regular',
        paddingVertical: 5,
        height: 40,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    question: {
        position: 'absolute',
        left: '50%',
        top: '25%',
        transform: [{ translateX: -40 }],
        backgroundColor: 'rgba(0,0,0, 0.3)',
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
    },
    score: {
        fontSize: 25,
        color: 'white',
        fontFamily: 'regular',
    },
    next: {
        backgroundColor: 'white',
        padding: 15,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    artist: {
        fontFamily: 'regular',
        color: 'white',
        fontSize: 18,
        height: 30,
    },
});

export default Play;
