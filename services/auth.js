import axios from 'axios';

 const API_URL = 'https://api.my-five.be/api/';

 export const signUp = async (userData) => {
    try {
        console.log('userData', userData);
        const response = await axios.post(`${API_URL}auth/local/signup`, userData, {
            headers: {
                'Content-Type': 'application/json',  
            },
        });
        
        console.log('Response:', response);
        return response; 
        
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response);
            return error.response;  
        } else if (error.request) {
            console.error('Error request:', error.request);
            return { error: 'No response received from the server.' };
        } else {
            console.error('Error message:', error.message);
            return { error: error.message };
        }
    }
};

export const login = async (data) => {
    const response = await axios.post(`${API_URL}auth/local/signin`, data, {
        headers: {
            'Content-Type': 'application/json',  
        },
    });
     return response;  
};

export const forgotPassword = async (data) => {
    const response = await axios.post(`${API_URL}auth/forgot-password`, data, {
        headers: {
            'Content-Type': 'application/json', 
        },
    });
    return response;  
};


export const ResendLink = async (data) => {
    console.log(API_URL)
     const response = await axios.post(`${API_URL}auth/email/resend-confirmation
`, data, {
        headers: {
            'Content-Type': 'application/json', 
        },
    });
    return response;  
};


export const getCurrent = async (token) => { 
    try {
        const response = await axios.get(`${API_URL}user/current-user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;  
    } catch (error) {
        console.error('Error in getCurrent:', error);
        throw error; // Optionally rethrow the error for further handling
    }
}
export const updateUserProfile = async (userId, userData) => {
    try {
        const response = await axios.patch(`${API_URL}user/${userId}`, userData);
        return response; 
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error; 
    }
};
