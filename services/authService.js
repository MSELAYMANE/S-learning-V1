const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (formData, role) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      ...formData,
      role,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
