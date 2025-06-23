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
        const response = await axiosInstance.get(`/clients`);
        
        if (response.data.success) {
            console.log("Data retrieved successfully:", response.data);
            return response.data;
        }
    } catch (error) {
        console.error("Error retrieving data:", error);
        throw error;
    }
    return [];
}

export const getMeetings = async () => {
    try{
        const response = await axiosInstance.get(`/meetings`);
        
        if (response.data.success) {
            console.log("Meetings data retrieved successfully:", response.data);
            return response.data;
        }
    } catch (error) {
        console.error("Error retrieving meetings data:", error);
        throw error;
    }

    return [];
}

export const getOffices = async () => {
    try {
        const response = await axiosInstance.get(`/offices`);
        
        if (response.data.success) {
            console.log("Offices data retrieved successfully:", response.data);
            return response.data;
        }
    } catch (error) {
        console.error("Error retrieving offices data:", error);
        throw error;
    }

    return [];
}

export const getInternet = async () => {
    try {
        const response = await axiosInstance.get(`/internet`);
        
        if (response.data.success) {
            console.log("Internet data retrieved successfully:", response.data);
            return response.data;
        }
    } catch (error) {
        console.error("Error retrieving internet data:", error);
        throw error;
    }

    return [];
}

export const updateMeeting = async (meetingData) => {
    if (!meetingData || Object.keys(meetingData).length === 0) {
        console.error("No meeting data provided to update.");
        return false;
    }

    try {
        const response = await axiosInstance.put(`/meetings/${meetingData.meeting_id}`, meetingData);
        return response.data;
    } catch (error) {
        console.error("Error updating meeting data:", error);
        throw error;
    }
}

export const deleteMeeting = async (meetingId) => {
    if (!meetingId) {
        console.error("No meeting ID provided to delete.");
        return false;
    }

    try {
        const response = await axiosInstance.delete(`/meetings/${meetingId}`);
        console.log("Deleting meeting with ID:", meetingId);
        return response.data;
    } catch (error) {
        console.error("Error deleting meeting:", error);
        throw error;
    }
}