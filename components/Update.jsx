import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useRef } from 'react';
  import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../helpers/staticFunctions';
import { CountryPicker } from "react-native-country-codes-picker";
import PhoneInput from 'react-native-international-phone-number';
// import { updateProfile } from '../services/auth'; // Adjust your service method
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';
import ScreenWrapper from './ScreenWrapper';
import Input from './Input';
import Button from './Button';

const UpdateProfile = ({ userData = {} }) => {
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(formatDate(new Date())); // Format initial date
    const [selectGender, setSelectGender] = useState(userData?.gender || "male");
    const [countryCode, setCountryCode] = useState(userData?.countryCode || '');
    const [inputValue, setInputValue] = useState(userData?.phoneNumber || '');    const [showCountryPicker, setShowCountryPicker] = useState(false);
     const [errors, setErrors] = useState({});
    const [selectedCountry, setSelectedCountry] = useState(null);

    const nameRef = useRef(userData.firstName);
    const lastNameRef = useRef(userData.lastName);
    const emailRef = useRef(userData.email);
    const addressRef = useRef(userData.address);
    const passwordRef = useRef('');

    const handleInputValue = (phoneNumber) => {
        setInputValue(phoneNumber);
    };

    const handleSelectedCountry = (country) => {
        setSelectedCountry(country);
    };

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
        };

        const errors = validateInputs();
        if (Object.keys(errors).length > 0) {
            const errorMessages = Object.values(errors).join('\n');
            Alert.alert('Update Profile', errorMessages);
            setLoading(false);
            return;
        }

        try {
            const response = await updateProfile(record);
            if (response.status === 200) {
                Alert.alert("Success", "Profile updated successfully!");
            } else {
                Alert.alert("Error", response.data.message || "Something went wrong.");
            }
        } catch (error) {
            Alert.alert("Error", error.response?.data?.error || "Failed to update profile. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const validateInputs = () => {
        const errors = {};
        // Similar validation logic as in the SignUp component
        return errors;
    };

    const toggleDatePicker = () => {
        setShowDatePicker(prev => !prev);
    };

    const onChangeDate = ({ type }, selectedDate) => {
        toggleDatePicker();
        if (type === "set") {
            const currentDate = selectedDate || date;
            setDate(currentDate);
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
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <Text style={styles.welcomeText}>Update Profile</Text>
                    <View style={styles.form}>
                        {/* Input fields similar to SignUp */}
                        <Input placeholder='First Name' defaultValue={userData.firstName} onChangeText={value => nameRef.current = value} />
                        <Input placeholder='Last Name' defaultValue={userData.lastName} onChangeText={value => lastNameRef.current = value} />
                        <Input placeholder='Email' defaultValue={userData.email} onChangeText={value => emailRef.current = value} />
                        <Input placeholder='Address' defaultValue={userData.address} onChangeText={value => addressRef.current = value} />

                        <Pressable onPress={toggleDatePicker}>
                            <Input placeholder='Date of Birth' value={dateOfBirth} editable={false} />
                        </Pressable>
                        {showDatePicker && (
                            <DateTimePicker
                                mode='date'
                                display='spinner'
                                value={date}
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
                setCountryCode(item.name.fr); // Sets the selected country name
                setSelectedCountry(item);     // Updates the selected country object
                closeCountryPicker();         // Closes the modal
            }}
            style={{ modal: { height: '80%' } }}
        />
    </View>
</Modal>


                        <PhoneInput
                            value={inputValue}
                            onChangePhoneNumber={handleInputValue}
                        />

                        <Button title='Update Profile' loading={loading} onPress={onSubmit} />
                    </View>
                </View>
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
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
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
});
