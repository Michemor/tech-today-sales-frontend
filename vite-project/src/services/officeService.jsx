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

    if(!officeData || Object.keys(officeData).length === 0) {
        console.error("No data provided to send.");
        return false;
    }

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

export const getOffices = async () => {
    try {
        const response = await axiosInstance.get(`/listsites`);
        const { success, message, buildings, offices} = response.data;
        const data = {
            buildings: buildings || [],
            offices: offices || []
        };

        if (success) {
            console.log("Data retrieved successfully:", message);
            return data;
        }
    } catch (error) {
        console.error("Error retrieving data:", error);
        throw error;
    }
    return [];
}