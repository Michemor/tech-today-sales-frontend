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

export const sendClientData = async (clientData) => {

    if (!clientData || Object.keys(clientData).length === 0) {
        console.error("No data provided to send.");
        return false;
    }
    console.log("Sending client data:", clientData);

    try{
        const response = await axiosInstance.post(`/salesdetails`, clientData);
        return response.data;


    } catch (error) {
        console.error("Error sending data:", error);
        throw error;
    }
}

export const getClients = async () => {
    try {
        const response = await axiosInstance.get(`/listclients`);
        const { success, message, data } = response.data;

        if (success) {
            console.log("Data retrieved successfully:", message, data);
            return data;
        }
    } catch (error) {
        console.error("Error retrieving data:", error);
        throw error;
    }
    return [];
}