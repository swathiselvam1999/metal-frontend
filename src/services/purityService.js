import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getPurities = () => axios.get(`${API}/purities`);
export const addPurity = (data) => axios.post(`${API}/purities`, data);
export const updatePurity = (id, data) =>
  axios.put(`${API}/purities/${id}`, data);
export const deletePurity = (id) => axios.delete(`${API}/purities/${id}`);

export default API;
