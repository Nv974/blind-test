import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

const Form = ({
    onSubmitTitleHandler,
    onSubmitArtistNameHandler,
    showTitleInput,
    killTime,
}) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    return (
        <View style={styles.container}>
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
                            onSubmitEditing={handleSubmit(onSubmitArtistNameHandler)}
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
                            onSubmitEditing={handleSubmit(onSubmitTitleHandler)}
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
                        <Ionicons name='checkmark-outline' color='white' size={32} />
                    )}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', marginBottom: 40 },
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
});

export default Form;
