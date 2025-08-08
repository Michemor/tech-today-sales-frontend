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

export const updateData = async (data) => {
    if (!data || Object.keys(data).length === 0) {
        console.error("No data provided to update.");
        return false;
    }

    console.log("Updating data:", data);
    try {
        const response = await axiosInstance.post(`/update`, data);
        if (response.data.success) {
            console.log("Data updated successfully:", response.data.message);
            return response.data.message;
        } else {
            console.error("Failed to update data:", response.data.message);
            return false;
        }
    } catch (error) {
        console.error("Error updating data:", error);
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


export const getSales = async () => {
    try {
        const response = await axiosInstance.get(`/sales`);
        if (response.data.success) {
            console.log("Sales data retrieved successfully:", response.data.message);
            return response.data.sales_data;
        }
    } catch (error) {
        console.error("Error retrieving sales data:", error);
        throw error;
    }
    return [];
}

export const getClientData = async (id) => {
    try {
        console.log("Retrieving client data for ID:", id);
      const response = await axiosInstance.get(`/sales/${id}`);
            if (response.data.success) {
                console.log("Sales data retrieved successfully:", response.data.message);
                return response.data.client_data;
            }
    } catch (error) {
        console.error("Error retrieving client data:", error);
        throw error;
    }
}

export const getBuildingNames = async () => {
    try {
        const response = await axiosInstance.get(`/building_names`);
        if (response.data.success) {
            console.log("Building names retrieved successfully:", response.data.building_names);
            return response.data.building_names;
        }
    } catch (error) {
        console.error("Error retrieving building names:", error);
        throw error;
    }
    return [];
}


export const getOfficeNames = async () => {
    try {
        const response = await axiosInstance.get(`/office_names`);
        if (response.data.success) {
            console.log("Office names retrieved successfully:", response.data.office_names);
            return response.data.office_names;
        }
    } catch (error) {
        console.error("Error retrieving office names:", error);
        throw error;
    }
    return [];
}
