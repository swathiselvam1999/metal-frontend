import axios from "axios";
import API from "./purityService";

export const addRate = (data) => axios.post(`${API}/rates`, data);

export const getRates = async (filter = {}) => {
  const query = new URLSearchParams(filter).toString();
  const res = await axios.get(`${API}/rates?${query}`);
  return res.data; 
};


export const getLatestRate = async (metal, purity) => {
  const res = await axios.get(`${API}/rates/latest?metal=${metal}&purity=${purity}`);
  return res.data;
};

