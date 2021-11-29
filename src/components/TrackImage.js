import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const TrackImage = props => {
    const tracks = useSelector(state => state.api.tracks);

    return (
        <ImageBackground
            source={{
                uri: !props.killTime
                    ? tracks[props.currentIndex].track.album.images[0].url
                    : tracks[props.currentIndex - 1].track.album.images[0].url,
            }}
            style={{
                width: 200,
                height: 200,
                flexDirection: 'column-reverse',
            }}
            blurRadius={props.killTime ? 0 : 40}
            borderRadius={7}
        >
            <View>
                {!props.killTime && (
                    <Text
                        style={
                            props.showTitleInput
                                ? styles.label
                                : {
                                      ...styles.label,
                                      backgroundColor: 'rgba(0, 185, 121, 0.7)',
                                  }
                        }
                    >
                        {props.showTitleInput ? 'Titre du morceau' : "Nom de l'artiste"}
                    </Text>
                )}
            </View>
            {!props.killTime && (
                <View style={styles.question}>
                    <Text>
                        <Ionicons name='help-outline' size={50} color='white' />
                    </Text>
                </View>
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
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
});

export default TrackImage;
