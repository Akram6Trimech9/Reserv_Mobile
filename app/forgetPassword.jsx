import { View, Text, StyleSheet, Alert } from 'react-native';
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
import { forgotPassword } from '../services/auth'; // Import your forgotPassword function

const ResetPassword = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const [loading, setLoading] = useState(false);
    
    const onSubmit = async () => {    
        if (!emailRef.current) { 
            Alert.alert('Réinitialisation du mot de passe', "Veuillez entrer votre email");
            return; 
        }

        // Prepare data for API request
        const data = { email: emailRef.current };
        
        // Start loading state
        setLoading(true);
        try {
            const response = await forgotPassword(data); // Call the API function
            console.log('res', response);
        
            if (response.status === 202) { // Check for a successful response
                Alert.alert('Réinitialisation du mot de passe', "Un lien de réinitialisation a été envoyé à votre adresse email.");
            } else if (response.status === 400) {
                // Handle bad request response, e.g., email not found or invalid
                Alert.alert('Erreur', "Veuillez vérifier votre email.");
            } else {
                // Handle unexpected response status
                Alert.alert('Erreur', "Une erreur inattendue s'est produite. Veuillez réessayer.");
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status code outside of the 2xx range
                Alert.alert('Erreur', error.response.data.message || "Une erreur s'est produite. Veuillez réessayer.");
            } else if (error.request) {
                // Request was made but no response was received
                Alert.alert('Erreur', "Le serveur ne répond pas. Veuillez vérifier votre connexion.");
            } else {
                // Other errors during setting up the request
                Alert.alert('Erreur', error.message || "Une erreur s'est produite. Veuillez réessayer.");
            }
        } finally {
            // Stop loading state
            setLoading(false);
        }
        
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
