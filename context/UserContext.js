// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export const UserContext = createContext();
const API_URL = 'https://api.my-five.be/api/';
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            const userString = await AsyncStorage.getItem('currentUser');
            if (userString) {
                setCurrentUser(JSON.parse(userString));
            }
        } catch (error) {
            console.error('Error loading user:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveUser = async (user) => {
        try {
            await AsyncStorage.setItem('currentUser', JSON.stringify(user));
            setCurrentUser(user);
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const clearUser = async () => {
        try {
            await AsyncStorage.removeItem('currentUser');
            setCurrentUser(null);
        } catch (error) {
            console.error('Error clearing user:', error);
        }
    };

    const getCurrentUser = async (token) => {
        try {
            const response = await axios.get(`${API_URL}user/current-user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const user = response.data;
            await saveUser(user);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, saveUser, clearUser, getCurrentUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};
