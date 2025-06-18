import axios from 'axios';


// save the base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';

// Add CORS headers to axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});


// Function to send user data
export const sendData = async(officeData) => {

    try {
        const response = await axiosInstance.post(`/location`, officeData);
        const { success, message } = response.data;

        if (success){
            console.log("Data sent successfully:", message);
            return true;
        }
    } catch (error) {
        console.error("Error sending data:", error);
        throw error;
    }
     return false;
}