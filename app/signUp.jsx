import { View, Text, StyleSheet, TextInput, Pressable, Alert, Platform, ScrollView, TouchableWithoutFeedback, Modal } from 'react-native';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../helpers/staticFunctions';
import { Picker } from '@react-native-picker/picker';
import { CountryPicker } from "react-native-country-codes-picker";
import PhoneInput from 'react-native-international-phone-number';
import { signUp } from '../services/auth';
import ThankYouForSignup from './thankYouForSignup';
  
const SignUp = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const nameRef = useRef("");
    const lastNameRef = useRef("");
    const addressRef = useRef("");
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [selectGender, setSelectGender] = useState("male");
    const [show, setShow] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [errors, setErrors] = useState({});

    const [countryCode, setCountryCode] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [inputValue, setInputValue] = useState('');
    function handleInputValue(phoneNumber) {
        setInputValue(phoneNumber);
        console.log(phoneNumber, "phoneNumber")
    }

    function handleSelectedCountry(country) {
        setSelectedCountry(country);
    }
    const onSubmit = async () => {
        setLoading(true);
        const record = {
            password: passwordRef.current,
            gender: selectGender,
            dateOfBirth: dateOfBirth,
            phoneNumber: `${selectedCountry.callingCode}${inputValue.trim().replace(/\s+/g, '')}`,
            country: selectedCountry.name.fr,
            firstName: nameRef.current,
            lastName: lastNameRef.current,
            email: emailRef.current,
            address: addressRef.current,
            role: 'client'
        };
     
         const errors = validateInputs();
    
        if (Object.keys(errors).length > 0) {
            const errorMessages = Object.values(errors).join('\n');
            Alert.alert('Inscription', errorMessages);
            setLoading(false);

            return;
        } else {
            try {
                const response = await signUp(record);
                console.log('res', response);
                if (response.status === 201) {
                  setIsSend(true)
                  setLoading(false);

                } else {
                    Alert.alert("Erreur", response.data.message || "Something went wrong.");
                    setLoading(false);

                }
              } catch (error) {
                Alert.alert("Erreur", error.response?.data?.error || "Failed to sign up. Please try again later.");
                setLoading(false);
  
            } finally {
                setLoading(false);
              }
          
        }
    };
    

    const confirmIOSDate = () => {
        setDateOfBirth(formatDate(date));
        toggleDatePicker();
    };

    const pickerRef = useRef();

    const open = () => {
        pickerRef.current.focus();
    };

    const validateInputs = () => {
        const errors = {};

        if (!nameRef.current || nameRef.current.length < 2 || nameRef.current.length > 50) {
            errors.firstName = "Le prénom doit avoir entre 2 et 50 caractères.";

        }
        if (!lastNameRef.current || lastNameRef.current.length < 2 || lastNameRef.current.length > 50) {
            errors.lastName = "Le nom de famille doit avoir entre 2 et 50 caractères.";
        }
        if (!emailRef.current || !/\S+@\S+\.\S+/.test(emailRef.current)) {
            errors.email = "Veuillez entrer une adresse email valide.";
        }
        if (!selectGender) {
            errors.gender = "Veuillez sélectionner votre genre.";
        }
        if (!dateOfBirth) {
            errors.dateOfBirth = "Veuillez entrer votre date de naissance.";
        }
        if (!inputValue) {
            errors.phoneNumber = "Veuillez entrer votre numéro de téléphone.";
        }
        if (!passwordRef.current || passwordRef.current.length < 6) {
            errors.password = "Le mot de passe doit comporter au moins 6 caractères.";
        }
        if (!countryCode) {
            errors.country = "Veuillez sélectionner votre pays.";
        }
        if (!addressRef.current) {
            errors.address = "Veuillez entrer votre adresse.";
        }
        setErrors(errors)
        return errors;
    };



    const close = () => {
        pickerRef.current.blur();
    };

    const toggleDatePicker = () => {
        setShowDatePicker(prev => !prev);
    };

    const onChange = ({ type }, selectedDate) => {
        toggleDatePicker();

        if (type === "set") {
            const currentDate = selectedDate || date;
            setDate(currentDate);

            if (Platform.OS === 'android') {
                setDateOfBirth(formatDate(currentDate));
            }
        }
    };

    const openCountryPicker = () => {
        setShow(!show);
    };

    const closeCountryPicker = () => {
        setShow(false);
    };

    if(isSend){ 
        return (
            <ThankYouForSignup email={emailRef.current} />
        )
   }
    return (
        <ScreenWrapper bg="white">
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <BackButton router={router} />
                    <View>
                        <Text style={styles.welcomeText}>Bienvenue</Text>
                        <Text style={styles.welcomeText}>Commencez</Text>
                    </View>
                    <View style={styles.form}>
                        <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
                            Veuillez remplir les informations pour créer un compte
                        </Text>
                        <Input
                            icon={<Icon name="user" size={26} strokeWidth={1.6}     {...(errors.firstName ? { color: 'red' } : {})} />}
                            placeholder='Entrez votre nom'
                            onChangeText={value => nameRef.current = value}
                            isError={!!errors.firstName}
                         />
                        <Input
                            icon={<Icon name="user" size={26} strokeWidth={1.6}  {...(errors.lastName ? { color: 'red' } : {})} />}
                            placeholder='Entrez votre prenom'
                            onChangeText={value => lastNameRef.current = value}
                            isError={!!errors.lastName}

                        />
                        <Input
                            icon={<Icon name="mail" size={26} strokeWidth={1.6}  {...(errors.email ? { color: 'red' } : {})} />}
                            placeholder='Entrez votre email'
                            onChangeText={value => emailRef.current = value}
                            isError={!!errors.email}

                        />
                        <Input
                            icon={<Icon name="lock" size={26} strokeWidth={1.6}  {...(errors.password ? { color: 'red' } : {})} />}
                            placeholder='Entrez votre mot de passe'
                            secureTextEntry={!showPassword}
                            onChangeText={value => passwordRef.current = value}
                            isError={!!errors.password}

                        />
                        {passwordRef.current && (
                            <Text style={styles.showPasswordText} onPress={() => setShowPassword(prev => !prev)}>
                                {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                            </Text>
                        )}

                        <Pressable onPress={toggleDatePicker}>
                            <Input
                                icon={<Icon name="date" size={26} strokeWidth={1.6}   {...(errors.dateOfBirth ? { color: 'red' } : {})} />}
                                placeholder='Entrez votre date de naissance'
                                value={dateOfBirth}
                                editable={false}
                                isError={!!errors.dateOfBirth}

                            />
                        </Pressable>

                        {showDatePicker && Platform.OS === 'android' && (
                            <DateTimePicker
                                mode='date'
                                display='spinner'
                                value={date}
                                onChange={onChange}
                                minimumDate={new Date('1960-1-1')}
                            />
                        )}

                        {showDatePicker && Platform.OS === 'ios' && (
                            <DateTimePicker
                                mode='date'
                                display='spinner'
                                value={date}
                                onChange={onChange}
                                minimumDate={new Date('1960-1-1')}
                                onTouchCancel={confirmIOSDate}
                            />
                        )}

                        <Pressable onPress={open}>
                            <Input
                                icon={<Icon name="gender" size={26} strokeWidth={1.6}   {...(errors.gender ? { color: 'red' } : {})}  />}
                                placeholder='Entrez votre genre'
                                value={selectGender === 'female' ? 'Femme' : 'Homme'}
                                editable={false}
                                isError={!!errors.gender}

                            />
                        </Pressable>

                        <Picker
                            ref={pickerRef}
                            style={{ display: 'none' }}
                            selectedValue={selectGender}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectGender(itemValue)
                            }>
                            <Picker.Item label="Femme" value="female" />
                            <Picker.Item label="Homme" value="male" />
                        </Picker>

                        <Pressable onPress={openCountryPicker}>
                            <Input
                                icon={<Icon name="country" size={26} strokeWidth={1.6}    {...(errors.country ? { color: 'red' } : {})} />}
                                placeholder='Entrez votre pays'
                                value={countryCode}  // This will display the selected country
                                editable={false}
                                isError={!!errors.country}

                            />
                        </Pressable>

                        <Modal visible={show} transparent={true} animationType="slide">
                            <TouchableWithoutFeedback onPress={closeCountryPicker}>
                                <View style={styles.modalOverlay} />
                            </TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <CountryPicker
                                    show={true}
                                    pickerButtonOnPress={(item) => {
                                        setCountryCode(item.name.fr);
                                        setShow(false);
                                    }}
                                    onBackdropPress={() => setShow(false)}
                                    style={styles.country}
                                />
                            </View>
                        </Modal>

                        <PhoneInput
                            phoneInputStyles={{
                                container: {
                                    flexDirection: 'row',
                                    height: hp(7.2),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 0.4,
                                    borderColor: theme.colors.text,
                                    borderRadius: theme.radius.xxl,
                                    borderCurve: 'continuous',
                                    paddingHorizontal: 15,
                                },
                                flagContainer: {
                                    borderTopLeftRadius: 7,
                                    borderBottomLeftRadius: 7,
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                },
                                flag: {},
                                caret: {
                                    fontSize: 16,
                                }


                            }}
                            modalStyles={{
                                modal: {
                                     borderWidth: 1,
                                },
                                backdrop: {},
                                divider: {
                                    backgroundColor: 'transparent',
                                },
                                countriesList: {},
                                searchInput: {
                                    borderRadius: 8,
                                    borderWidth: 1,
                                      paddingHorizontal: 12,
                                    height: 46,
                                },
                                countryButton: {
                                    borderWidth: 1,
                                    borderColor:'white',
                                      marginVertical: 4,
                                    paddingVertical: 0,
                                },
                                noCountryText: {},
                                noCountryContainer: {},
                                flag: {
                                    color: '#FFFFFF',
                                    fontSize: 20,
                                },
                                callingCode: {
                                    color: 'black',
                                },
                                countryName: {
                                    color: 'black',
                                },
                            }}
                            value={inputValue}
                            language="fr"
                            defaultCountry="FR"
                            onChangePhoneNumber={handleInputValue}
                            selectedCountry={selectedCountry}
                            onChangeSelectedCountry={handleSelectedCountry}
                            placeholder='Votre numero'
                        />
                        <Input
                            icon={<Icon name="address" size={26} strokeWidth={1.6}   {...(errors.address ? { color: 'red' } : {})}  />}
                            placeholder='Entrez votre address'
                            onChangeText={value => addressRef.current = value}
                            isError={!!errors.address}

                        />
                        <Button title={'S’inscrire'} loading={loading} onPress={onSubmit} />
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Vous avez déjà un compte ?
                        </Text>
                        <Pressable onPress={() => router.push('login')}>
                            <Text style={[styles.footerText, { color: theme.colors.green, fontWeight: theme.fonts.semibold }]}>Connexion</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5)
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center'
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginBottom: hp(4),  
     },
    footerText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay behind the modal
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    country: {
        modal: {
            height: 500,
        },
        dialCode: {
            display: 'none'
        },
    }
});
