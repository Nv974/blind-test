import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
    BackHandler,
} from 'react-native';

//audio
import { Audio } from 'expo-av';

//UI
import Toast from 'react-native-toast-message';
import { LinearGradient } from 'expo-linear-gradient';

//redux
import { useSelector, useDispatch } from 'react-redux';
import * as appActions from '../store/actions/app';
import * as apiActions from '../store/actions/api';

//components
import Count from '../components/Count';
import Start from '../components/Start';
import Form from '../components/Form/Form';
import Flash from '../components/Flash';
import TrackImage from '../components/TrackImage';

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

    //Cycles de vie
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

    // sécurité si on appuie sur le boutton retour
    // à vérifier sur Ios
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

    /* retourne un objet envoyé au state pour afficher (dans Score.js) le resultat pour chaque piste */
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
        /*si la valeur de l'input n'est pas vide et que le jeu n'est pas en pause */
        if (data.artist !== undefined && !killTime) {
            let numberFound = 0;

            /* il faut que la valeur de l'input corresponde à au moins un artiste du morceau 
            pn incrémente la valeur numberFound */
            tracks[currentIndex].track.artists.forEach(artist =>
                formatData(artist.name) === formatData(data.artist)
                    ? numberFound++
                    : numberFound,
            );

            /* si au moins un artiste à été trouvé */
            if (numberFound !== 0) {
                const artistName = tracks[currentIndex].track.artists[0].name;
                showSuccess(artistName);
                dispatch(appActions.setScore(10));
                setArtistIsFound(true);
                setShowTitleInput(true);
                setError(2);
            } else {
                showError();
                //on a droit à une erreur
                if (error > 1) {
                    setError(error - 1);
                    /*sinon on perd 5 point et on passe a la question suivante */
                } else {
                    setArtistIsFound(false);
                    setShowTitleInput(true);
                    setError(2);
                    dispatch(appActions.setScore(-5));
                }
            }
        } else {
            /* si la valeur de l'input est vide on perd 5 points */
            setArtistIsFound(false);
            setShowTitleInput(true);
            setError(2);
            dispatch(appActions.setScore(-5));
        }
    };

    const onSubmitTitleHandler = (data, currentTime) => {
        // si la valeur de l'input est vide
        if (data.title !== undefined) {
            const formatedApiData = formatData(tracks[currentIndex].track.name);
            const formatedInputData = formatData(data.title);

            /* si la valeur de l'input correspond a la valeur du titre renvoyée par l'api */
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
                // si on a fait une erreur
                if (error > 1) {
                    showError();
                    setError(error - 1);
                    // sinon on perd 5 poins
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
            // si on n'a aucune valeur dans l'input
            // on perd 5 points
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

    /* changement de chanson après une reponse ou au bout de  30 sec */
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
                        <Flash showError={showError} showSuccess={showSuccess} />
                        <View>
                            <Text style={styles.score}>Score : {score}</Text>
                        </View>
                        <TrackImage
                            killTime={killTime}
                            currentIndex={currentIndex}
                            showTitleInput={showTitleInput}
                        />
                        <Text style={styles.artist}>
                            {artistIsFound &&
                                showTitleInput &&
                                tracks[currentIndex].track.artists[0].name}
                            {killTime &&
                            /* Si l'artiste et le titre font + de 33 caractère le texte est coupé */
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
                            {time > 0 && (
                                <Form
                                    showTitleInput={showTitleInput}
                                    killTime={killTime}
                                    onSubmitArtistNameHandler={onSubmitArtistNameHandler}
                                    onSubmitTitleHandler={onSubmitTitleHandler}
                                />
                            )}
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
