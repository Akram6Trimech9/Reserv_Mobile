import axios from 'axios';

 const API_URL = 'http://57.128.159.235:3000/api/auth/';

 export const signUp = async (userData) => {
    try {
        console.log('userData', userData);
        const response = await axios.post(`${API_URL}local/signup`, userData, {
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
    const response = await axios.post(`${API_URL}local/signin`, data, {
        headers: {
            'Content-Type': 'application/json',  
        },
    });
    console.log(response)
    return response;  
};

export const forgotPassword = async (data) => {
    const response = await axios.post(`${API_URL}forgot-password`, data, {
        headers: {
            'Content-Type': 'application/json', 
        },
    });
    return response;  
};


export const ResendLink = async (data) => {
    console.log(API_URL)
     const response = await axios.post(`${API_URL}email/resend-confirmation
`, data, {
        headers: {
            'Content-Type': 'application/json', 
        },
    });
    return response;  
};