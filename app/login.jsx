import { View, Text, StyleSheet, Alert, Keyboard, Pressable } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import Icon from '../assets/icons';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';
import { hp, wp } from '../helpers/common';
import Input from '../components/Input';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../services/auth';
import { ACESS } from '../constants/enum';
import { useGlobalContext } from '../context/GlobalProvider';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { setIsLogged, setUser } = useGlobalContext();  
    const { getCurrentUser, saveUser } = useContext(UserContext);

    const onSubmit = async () => {
        Keyboard.dismiss();  
        const signinData = { email: emailRef.current, password: passwordRef.current };
    
        if (!emailRef.current || !passwordRef.current) { 
            Alert.alert('Connexion', "Veuillez remplir tous les champs");
            return; 
        }
    
        setLoading(true);
    
        try {
            const loginRes = await login(signinData);
    
            if (loginRes.status === 200) {
                const { access_token, refresh_token } = loginRes.data;
                setIsLogged(true);
                await getCurrentUser(access_token);
                await AsyncStorage.setItem('access_token', access_token);
                await AsyncStorage.setItem('refresh_token', refresh_token);
    
                router.navigate('home');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message || 'Une erreur est survenue. Veuillez réessayer.';
                
                // Handle email not confirmed error
                if (errorMessage.toLowerCase().includes("your email")) {
                    Alert.alert("Erreur", "Votre email n'est pas encore confirmé. Veuillez vérifier votre boîte de réception.");
                }
                // Handle incorrect password error
                else if (errorMessage.toLowerCase().includes("password")) {
                    Alert.alert("Erreur", "Votre mot de passe est incorrect.");
                }
                // Handle user does not exist error
                else if (errorMessage.toLowerCase().includes("user does not exist")) {
                    Alert.alert("Erreur", 'Votre email est incorrect ou l\'utilisateur n\'existe pas.');
                }
                else {
                    Alert.alert("Erreur", errorMessage);
                }
            } else {
                Alert.alert("Erreur", "Une erreur est survenue. Veuillez réessayer.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper bg="white">
            <StatusBar style="dark" />
            <View style={styles.container}>
                <BackButton router={router} />
                <View>
                    <Text style={styles.welcomeText}>Salut ... </Text>
                    <Text style={styles.welcomeText}>Content de vous revoir ! </Text>
                </View>
                <View style={styles.form}>
                    <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
                        Veuillez vous connecter pour continuer
                    </Text>
                    <Input
                        icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
                        placeholder='Entrez votre email'
                        onChangeText={value => emailRef.current = value}
                    />
                    <Input
                        icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
                        placeholder='Entrez votre mot de passe'
                        secureTextEntry={!showPassword}
                        onChangeText={value => passwordRef.current = value}
                        isPassword={true}
                        eyesIcon={showPassword 
                            ? <Icon name="eyeoff" size={26} strokeWidth={1.6} onPress={() => setShowPassword(prev => !prev)} />
                            : <Icon name="eye" size={26} strokeWidth={1.6} onPress={() => setShowPassword(prev => !prev)} />
                        }
                    />
                    
                    <Text
                        style={styles.forgotPassword}
                        onPress={() => router.push('forgetPassword')}
                    >
                        Mot de passe oublié ?
                    </Text>
                    <Button title="Connexion" loading={loading} onPress={onSubmit} />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Vous n'avez pas de compte ?
                    </Text>
                    <Pressable onPress={() => router.push('signUp')}>
                        <Text style={[styles.footerText, { color: theme.colors.green, fontWeight: theme.fonts.semibold }]}>
                            Inscription
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default Login;

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
    showPasswordText: {
        textAlign: 'left',
        color: theme.colors.text,
        fontSize: hp(1.5),
        marginBottom: 2
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text,
    },
    footer: {
        flexDirection: 'row',
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
