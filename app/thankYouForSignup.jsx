import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import Icon from '../assets/icons';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';
import { hp, wp } from '../helpers/common';
import Button from '../components/Button';
import { ResendLink } from '../services/auth';

const ThankYouForSignup = ({email}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const resendEmail =async  () => {
        setLoading(true);
        try {

            const response = await ResendLink({email:email});
            console.log('res', response);
            if (response.status === 201) {
               setTimeout(() => {
                Alert.alert('Vérification', "Un nouvel email de vérification a été envoyé.");
                 setLoading(false);
                
            }, 2000);
            } else {
              Alert.alert("Erreur", response.data.message || "Something went wrong.");
              setLoading(false);

            }
          } catch (error) {
            setLoading(false);

            Alert.alert("Erreur", error.response?.data?.error || "Failed to resend. Please try again later.");
          } finally {
            setLoading(false);

          }
   
    };

    return (
        <ScreenWrapper bg="white">
            <StatusBar style="dark" />
            <View style={styles.container}>
                 <View>
                    <Text style={styles.welcomeText}>Merci de vous être inscrit !</Text>
                    <Text style={styles.welcomeText}>Veuillez vérifier votre email pour confirmer votre compte.</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Si vous n'avez pas reçu l'email, 
                    </Text>
                    <Pressable onPress={resendEmail}>
                        <Text style={[styles.footerText, { color: theme.colors.green, fontWeight: theme.fonts.semibold }]}>
                            cliquez ici pour le renvoyer
                        </Text>
                    </Pressable>
                </View>
                <Button title={'Retour à la connexion'} loading={loading} onPress={() => router.push('login')} />
            </View>
        </ScreenWrapper>
    );
};

export default ThankYouForSignup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5),
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.text,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    footerText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6),
    },
});
