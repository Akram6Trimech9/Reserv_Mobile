import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useRef, useContext, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../helpers/staticFunctions';
import { CountryPicker } from "react-native-country-codes-picker";
import PhoneInput from 'react-native-international-phone-number';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';
import ScreenWrapper from './ScreenWrapper';
import Input from './Input';
import Button from './Button';
import BackButton2 from './BackButtonCust';
import { UserContext } from '../context/UserContext';
import { updateUserProfile } from '../services/auth';

const UpdateProfile = ({ setOpenUpdate }) => {
    const { currentUser, setCurrentUser ,getCurrentUser } = useContext(UserContext);
    
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(currentUser.dateOfBirth || formatDate(new Date()));
    const [countryCode, setCountryCode] = useState(currentUser.country || '');
    const [inputValue, setInputValue] = useState(currentUser.phoneNumber || '');
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    
    const nameRef = useRef(currentUser.firstName);
    const lastNameRef = useRef(currentUser.lastName);
    const emailRef = useRef(currentUser.email);
    const addressRef = useRef(currentUser.address);

    const handleInputValue = (phoneNumber) => {
        setInputValue(phoneNumber);
    };

    const handleSelectedCountry = (country) => {
        setSelectedCountry(country);
    };

    useEffect(() => {
        if (currentUser) {
            setInputValue(currentUser.phoneNumber || '');
            setSelectedCountry({
                callingCode: currentUser.phoneNumber.slice(0, 3), // Adjust if needed
                name: { fr: currentUser.country },
            });
        }
    }, [currentUser]);

    const onSubmit = async () => {
        setLoading(true);
        const record = {
            firstName: nameRef.current,
            lastName: lastNameRef.current,
            email: emailRef.current,
            address: addressRef.current,
            dateOfBirth,
            phoneNumber: inputValue,
            country: selectedCountry.name.fr,
        };
        console.log('data',record)

        try {
            // Get user ID
            const userId = currentUser.id; // Ensure you have the correct user ID
            console.log('user:',userId);
            const updatedUserResp = await updateUserProfile(userId, record); // Call the update function
           // const updatedUser = await getCurrent(currentUser.token); // Assume you have currentUser.token
            //setCurrentUser(updatedUser);
            console.log('kk',updatedUserResp);
            setIsEditing(false);
            Alert.alert('Success', 'Profile updated successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const toggleDatePicker = () => {
        setShowDatePicker(prev => !prev);
    };

    const onChangeDate = ({ type }, selectedDate) => {
        toggleDatePicker();
        if (type === "set") {
            const currentDate = selectedDate || date;
            setDateOfBirth(formatDate(currentDate));
        }
    };

    const openCountryPicker = () => {
        setShowCountryPicker(true);
    };

    const closeCountryPicker = () => {
        setShowCountryPicker(false);
    };

    return (
        <ScreenWrapper bg="white">
            <View style={styles.header}>
                <BackButton2 setOpenUpdate={setOpenUpdate} />
                <Text
                    style={[styles.editText, isEditing && styles.editingText]}
                    onPress={() => setIsEditing(!isEditing)}
                >
                    Edit 
                </Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <Text style={styles.welcomeText}>Update Profile</Text>
                    <View style={styles.form}>
                        <Input
                            placeholder='First Name'
                            defaultValue={currentUser.firstName}
                            editable={isEditing}
                            onChangeText={value => nameRef.current = value}
                        />
                        <Input
                            placeholder='Last Name'
                            defaultValue={currentUser.lastName}
                            editable={isEditing}
                            onChangeText={value => lastNameRef.current = value}
                        />
                        <Input
                            placeholder='Email'
                            defaultValue={currentUser.email}
                            editable={isEditing}
                            onChangeText={value => emailRef.current = value}
                        />
                        <Input
                            placeholder='Address'
                            defaultValue={currentUser.address}
                            editable={isEditing}
                            onChangeText={value => addressRef.current = value}
                        />

                        <Pressable onPress={toggleDatePicker}>
                            <Input placeholder='Date of Birth' value={dateOfBirth} editable={false} />
                        </Pressable>
                        {showDatePicker && (
                            <DateTimePicker
                                mode='date'
                                display='spinner'
                                value={new Date(dateOfBirth)}
                                onChange={onChangeDate}
                            />
                        )}

                        <Pressable onPress={openCountryPicker}>
                            <Input placeholder='Country' value={countryCode} editable={false} />
                        </Pressable>
                        <Modal visible={showCountryPicker} transparent={true} animationType="slide">
                            <TouchableWithoutFeedback onPress={closeCountryPicker}>
                                <View style={styles.modalOverlay} />
                            </TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <CountryPicker
                                    show={showCountryPicker}
                                    pickerButtonOnPress={(item) => {
                                        setCountryCode(item.name.fr);
                                        setSelectedCountry(item);
                                        closeCountryPicker();
                                    }}
                                    style={{ modal: { height: '80%' } }}
                                />
                            </View>
                        </Modal>

                        <PhoneInput
                            value={inputValue}
                            onChangePhoneNumber={handleInputValue}
                            selectedCountry={selectedCountry}
                            onChangeSelectedCountry={handleSelectedCountry}
                            placeholder='Your number'
                            editable={isEditing}
                        />
                    </View>
                </View>
                {isEditing && (
                    <Button title='Save Changes' loading={loading} onPress={onSubmit} style={styles.button} />
                )}
            </ScrollView>
        </ScreenWrapper>
    );
};

export default UpdateProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(5),
        paddingBottom: hp(4),
        marginTop: hp(2),
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingBottom: 100,
    },
    welcomeText: {
        fontSize: hp(4),
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: hp(2),
    },
    form: {
        gap: 25,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
        paddingVertical: hp(1),
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        backgroundColor: theme.colors.background,
    },
    editText: {
        fontSize: hp(2.5),
        color: theme.colors.primary,
        fontWeight: '600',
    },
    editingText: {
        color: theme.colors.secondary,
    },
    button: {
        marginTop: hp(3),
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        paddingVertical: hp(2),
        paddingHorizontal: wp(5),
        alignSelf: 'center',
        width: 10,
    },
});
