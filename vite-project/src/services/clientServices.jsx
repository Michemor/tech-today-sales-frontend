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

// posts new data to the database
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

// fetches user data from the database
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

// fetches meetings data from the database
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

// fetches offices data from the database
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

//fetches internet data from the database
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

// updates meeting data in the database
export const updateMeeting = async (meetingData) => {
    if (!meetingData || Object.keys(meetingData).length === 0) {
        console.error("No meeting data provided to update.");
        return false;
    }

    try {
        const response = await axiosInstance.put(`/meeting/${meetingData.meeting_id}`, meetingData);
        return response.data;
    } catch (error) {
        console.error("Error updating meeting data:", error);
        throw error;
    }
}

// deletes a meeting from the database
export const deleteMeeting = async (meetingId) => {
    if (!meetingId) {
        console.error("No meeting ID provided to delete.");
        return false;
    }

    try {
        const response = await axiosInstance.delete(`/meeting/${meetingId}`);
        console.log("Deleting meeting with ID:", meetingId);
        return response.data;
    } catch (error) {
        console.error("Error deleting meeting:", error);
        throw error;
    }
}

export const updateClient = async (newClient) => {

    console.log("Updating client data:", newClient);
    if (!newClient || Object.keys(newClient).length === 0) {
        console.error("No client data provided to update.");
        return false;
    }

    try {
        const response = await axiosInstance.put(`/client/${newClient.client_id}`, {
            client_name: newClient.client_name,
            client_email: newClient.client_email,
            client_contact: newClient.client_contact,
            job_title: newClient.job_title,
            deal_information: newClient.deal_information,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating client data:", error);
        throw error;
    }
}

export const deleteClient = async (clientId) => {
    if (!clientId) {
        console.error("No client ID provided to delete.");
        return false;
    }

    try {
        const response = await axiosInstance.delete(`/client/${clientId}`);
        console.log("Deleting client with ID:", clientId);
        return response.data;
    } catch (error) {
        console.error("Error deleting client:", error);
        throw error;
    }
}

export const updateOffice = async (newOffice) => {
    console.log("Updating office data:", newOffice);
    if (!newOffice || Object.keys(newOffice).length === 0) {
        console.error("No office data provided to update.");
        return false;
    }

    try {
        const response = await axiosInstance.put(`/office/${newOffice.office_id}`, {
            office_name: newOffice.office_name,
            office_location: newOffice.office_location,
            office_contact: newOffice.office_contact,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating office data:", error);
        throw error;
    }
}

export const deleteOffice = async (officeId) => {
    if (!officeId) {
        console.error("No office ID provided to delete.");
        return false;
    }

    try {
        const response = await axiosInstance.delete(`/office/${officeId}`);
        console.log("Deleting office with ID:", officeId);
        return response.data;
    } catch (error) {
        console.error("Error deleting office:", error);
        throw error;
    }
}

export const deleteInternet = async(internetId) => {
    if (!internetId) {
        console.error("No internet ID provided to delete.");
        return false;
    }

    try {
        const response = await axiosInstance.delete(`/internet/${internetId}`);
        console.log("Deleting internet with ID:", internetId);
        return response.data;
    } catch (error) {
        console.error("Error deleting internet:", error);
        throw error;
    }
}

export const updateInternet = async (newInternet) => {
    console.log("Updating internet data:", newInternet);
    if (!newInternet || Object.keys(newInternet).length === 0) {
        console.error("No internet data provided to update.");
        return false;
    }

    try {
        const response = await axiosInstance.put(`/internet/${newInternet.internet_id}`, newInternet)
        return response.data;
    } catch (error) {
        console.error("Error updating internet data:", error);
        throw error;
    }
}