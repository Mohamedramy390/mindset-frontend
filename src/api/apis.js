import axios from 'axios';

// 1. Configure the base URL
const api = axios.create({
  baseURL: 'https://mindset-backend-production.up.railway.app/api',
});

// 2. ADD THIS: Automatically add the token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// ---------------------------------------------------------
// Now your functions become much cleaner (no manual headers needed!)
// ---------------------------------------------------------

// Get all rooms
export const getAllRooms = async () => {
  try {
    const response = await api.get('/rooms'); // Use 'api' instead of 'axios'
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

// Get room by ID (This will now work!)
export const getRoomById = async (roomId) => {
  try {
    // The interceptor automatically adds the Authorization header here now
    const response = await api.get(`/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching room:', error);
    throw error;
  }
};

// Update room
export const updateRoom = async (roomId, roomData) => {
  try {
    const response = await api.put(`/rooms/${roomId}`, roomData);
    return response.data;
  } catch (error) {
    console.error('Error updating room:', error);
    throw error;
  }
};

// Enroll in a room
export const enrollRoom = async (roomId) => {
  try {
    // You don't need to manually get token anymore
    const response = await api.post(`/rooms/${roomId}/enroll`, {});
    return response.data;
  } catch (error) {
    console.error('Error enrolling in room:', error);
    throw error;
  }
};

// Get current user's rooms
export const getUserRooms = async () => {
  try {
    const res = await api.get("/myrooms"); // Cleaner!
    return res.data.data.rooms;
  } catch (error) {
    console.error("Error fetching user rooms:", error.response?.data || error.message);
    throw error;
  }
};

// Ask a question in a room
export const askRoomQuestion = async (roomId, query) => {
  try {
    const response = await api.post(`/rooms/${roomId}`, { query });
    return response.data;
  } catch (error) {
    console.error('Error asking question:', error);
    throw error;
  }
};

export const createRoom = async (formData) => {
  // For FormData, axios usually detects Content-Type automatically, 
  // but we can keep it explicit if you prefer. Auth is handled by interceptor.
  const res = await api.post("/myrooms", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export const deleteRoom = async (roomId) => {
  const res = await api.delete(`/rooms/${roomId}`);
  return res.data;
};