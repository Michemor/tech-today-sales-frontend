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

export const getBuildings = async () => {
    try {
        const response = await axiosInstance.get(`/locations/buildings`);
        const { success, buildings } = response.data;

        if (success) {
            console.log("Buildings retrieved successfully:", buildings);
            return { success: true, buildings };
        }
    } catch (error) {
        console.error("Error retrieving buildings:", error);
        throw error;
    }
    return { success: false, buildings: [] };

}

export const getOffices = async () => {
    try {
        const response = await axiosInstance.get(`/locations/offices`);
        const { success, offices } = response.data;

        if (success) {
            console.log("Offices retrieved successfully:", offices);
            return { success: true, offices };
        }
    } catch (error) {
        console.error("Error retrieving offices:", error);
        throw error;
    }
    return { success: false, offices: [] };
}

export const deleteOffice = async (newOffice) => {
    try {
        const response = await axiosInstance.delete(`/locations/office/${newOffice.office_id}`, newOffice);
        const { success, message } = response.data;

        if (success) {
            console.log("Office deleted successfully:", message);
            return { success: true, message };
        }
    } catch (error) {
        console.error("Error deleting office:", error);
        throw error;
    }
    return { success: false, message: "Failed to delete office" };
}

export const updateOffice = async (newOffice) => {
    try {
        const response = await axiosInstance.put(`/locations/office/${newOffice.office_id}`, newOffice);
        const { success, message } = response.data;

        if (success) {
            console.log("Office updated successfully:", message);
            return { success: true, message };
        }
    } catch (error) {
        console.error("Error updating office:", error);
        throw error;
    }
    return { success: false, message: "Failed to update office" };
}

export const deleteBuilding = async (buildingId) => {
    try {
        const response = await axiosInstance.delete(`/locations/building/${buildingId}`);
        const { success, message } = response.data;

        if (success) {
            console.log("Building deleted successfully:", message);
            return { success: true, message };
        }
    } catch (error) {
        console.error("Error deleting building:", error);
        throw error;
    }
    return { success: false, message: "Failed to delete building" };
}

export const updateBuilding = async (buildingData) => {
    if (!buildingData || Object.keys(buildingData).length === 0) {
        console.error("No building data provided to update.");
        return false;
    }

    try {
        const response = await axiosInstance.put(`/locations/building/${buildingData.building_id}`, buildingData);
        const { success, message } = response.data;

        if (success) {
            console.log("Building updated successfully:", message);
            return { success: true, message };
        }
    } catch (error) {
        console.error("Error updating building data:", error);
        throw error;
    }
    return { success: false, message: "Failed to update building" };
}