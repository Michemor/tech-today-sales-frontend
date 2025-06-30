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




export const getSalesData = async () => {
    try {
        const response = await axiosInstance.get(`/sales`);
        
        if (response.data.success) {
            console.log("Sales data retrieved successfully:", response.data.message);
            return response.data.sales;
        }
    } catch (error) {
        console.error("Error retrieving sales data:", error);
        throw error;
    }

    return [];
}