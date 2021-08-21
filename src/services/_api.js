import axios from 'axios';

const $http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export default $http;
