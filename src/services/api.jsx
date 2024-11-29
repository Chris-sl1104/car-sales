import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000', // 后端地址
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (username, password) =>
    API.post('/auth/login', { username, password });

// Clean up invalid parameters and handle array formatting
const cleanParams = (params) =>
    Object.fromEntries(
        Object.entries(params).map(([key, value]) => {
            if (Array.isArray(value)) {
                // 将数组序列化为 JSON 字符串
                return [key, JSON.stringify(value)];
            }
            return [key, value];
        }).filter(([_, value]) => value !== null && value !== undefined && value !== '')
    );

// Get vehicle data
export const fetchCars = (filters) => {
    const params = cleanParams(filters);
    return API.get('/car', { params });
};

// Get all brands
export const fetchMakes = () => API.get('/car/makes');

// Get the model of the specified brand
export const fetchModelsByMake = (make) => {
    if (!make) {
        throw new Error('Make is required to fetch models.');
    }
    return API.get('/car/models', { params: { make } });
};

// Get all sales locations
export const fetchSaleLocations = (make, model) => {
    if (!make && !model) {
        console.warn('Both make and model are empty; fetching all locations.');
    }
    const params = cleanParams({ make, model });
    return API.get('/car/locations', { params });
};
