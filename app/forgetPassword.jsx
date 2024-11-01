import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import Icon from '../assets/icons';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';
import { hp, wp } from '../helpers/common';
import Input from '../components/Input';
import Button from '../components/Button';

const ResetPassword = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {    
        if (!emailRef.current) { 
            Alert.alert('Réinitialisation du mot de passe', "Veuillez entrer votre email");
            return; 
        }

        // Simulate sending a password reset request
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Réinitialisation du mot de passe', "Un lien de réinitialisation a été envoyé à votre adresse email.");
        }, 2000);
    };

    return (
        <ScreenWrapper bg="white">
            <StatusBar style="dark" />
            <View style={styles.container}>
                <BackButton router={router} />
                <View>
                    <Text style={styles.welcomeText}>Réinitialiser le mot de passe</Text>
                </View>
                <View style={styles.form}>
                    <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
                        Entrez votre email pour recevoir un lien de réinitialisation
                    </Text>
                    <Input
                        icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
                        placeholder='Entrez votre email'
                        onChangeText={value => emailRef.current = value}
                    />
                    <Button title={'Envoyer'} loading={loading} onPress={onSubmit} />
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5)
    },
    welcomeText: {
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.text,
    },
    form: {
        gap: 25,
    },
});