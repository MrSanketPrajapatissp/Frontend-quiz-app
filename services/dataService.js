import axios from 'axios';

const API_URL = 'http://localhost:8086/api/data'; // Ensure this URL is correct
const username = 'aman';
const password = 'aman'; // Replace with the actual password 

export const getData = async () => {
    try {
        const credentials = btoa(`${username}:${password}`); // Base64 encode the credentials
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};
