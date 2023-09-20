import axios from 'axios';

const API_KEY = 'lfsJqar4SDd4itjO83eHVWgUjUbTdL9IEeMN0BYnt2dHNA2fTpjg3tCb';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`search?query=${query}&page=${page}`);
  return data;
};