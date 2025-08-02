import axios from "axios";
import API from "./purityService";

export const addRate = (data) => axios.post(`${API}/rates`, data);

export const getRates = (filter = {}) => {
  const query = new URLSearchParams(filter).toString();
  return axios.get(`${API}/rates?${query}`);
};

export const getLatestRate = (metal, purity) => {
  return axios.get(`${API}/rates/latest?metal=${metal}&purity=${purity}`);
};
